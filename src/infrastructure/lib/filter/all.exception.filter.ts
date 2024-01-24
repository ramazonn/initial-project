import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";

import { logger } from "../logger";
import * as J from "fp-ts/Json";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";

import {
	CustomHttpExceptionResponse,
	HttpExceptionResponse,
} from "../../../common/interface/HttpExceptionResponse";
import { ErrorStackParserFunction } from "src/common/error/ErrorStackParser";
import { Prompt } from "../prompts/types";
import { TypeORMError } from "typeorm/error/TypeORMError";
import { getPromptByCode } from "../prompts/prompts";

export class AllExceptionsFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const res = ctx.getResponse<Response>();
		const req = ctx.getRequest<Request>();

		let status: HttpStatus;
		let errorType: string;
		let errorMessage: string | string[];
		let responseMessage: string | string[];

		let stack: string[] = [];
		// :TODO ? remove console.log()
		console.log("+--", exception, "---+");
		if (String(exception).includes("Cannot GET")) {
			return res.status(404).send((exception as HttpException).message);
		}

		stack = ErrorStackParserFunction(exception);

		if (exception instanceof HttpException) {
			status = exception.getStatus();

			const errorResponse = exception.getResponse();

			switch (status) {
				case HttpStatus.BAD_REQUEST:
					errorType = "Bad Request";
					break;
				case HttpStatus.NOT_FOUND:
					errorType = "Not Found!";
					break;
				case HttpStatus.UNAUTHORIZED:
					errorType = "UnAuthorized!";
					break;
				case HttpStatus.CONFLICT:
					errorType = "Conflict";
					break;
				case HttpStatus.UNPROCESSABLE_ENTITY:
					errorType = "Not Valididate";
					// TODO extract method
					return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
						statusCode: (errorResponse as any).statusCode,
						error: errorType,
						path: req.path,
						method: req.method,
						timeStamp: new Date(),
						correlationId: req.headers["x-correlation-id"] as unknown as string,
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
						message: (errorResponse as any).message,
					});
				default:
					errorType = (errorResponse as HttpExceptionResponse).error;
			}

			errorMessage = errorResponse.toString();
			responseMessage = errorMessage;
		} else if (exception instanceof TypeORMError) {
			const foundPrompt = getPromptByCode(
				"postgres",
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				(exception as any).driverError?.code as string,
			);
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			errorType = "Server Error";
			errorMessage = String(exception);
			responseMessage =
				foundPrompt === null ? "Internal Server Error" : JSON.stringify(foundPrompt.value);
		} else {
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			errorType = "Server Error";
			errorMessage = String(exception);
			responseMessage = "Internal Server Error";
		}

		const parsedPrompt = this.parsePrompt(responseMessage);

		logger.error({
			error: errorType,
			message: errorMessage,
			prompt: E.isLeft(parsedPrompt) ? {} : parsedPrompt.right,
			stack: stack,
		});

		// custom exception data
		const errorResponse = this.getErrorResponse(
			status,
			errorType,
			E.isLeft(parsedPrompt) ? ({} as Prompt) : parsedPrompt.right,
			req,
		);

		res.status(status).json(errorResponse);
	}

	getErrorResponse = (
		status: HttpStatus,
		errorType: string,
		prompt: Prompt,
		req: Request,
	): CustomHttpExceptionResponse => ({
		statusCode: status,
		error: errorType,
		path: req.path,
		method: req.method,
		message: prompt ? (prompt.labels && prompt.labels.length ? prompt.labels[0] : prompt) : {}, // TODO send message depends on language
		timeStamp: new Date(),
		correlationId: req.headers["x-correlation-id"] as unknown as string,
	});

	parsePrompt(message: string | string[]): E.Left<string[]> | E.Right<Prompt> {
		if (Array.isArray(message)) {
			return E.left(message);
		}

		return pipe(
			message,
			J.parse,
			E.mapLeft((e: any) => e),
		) as E.Right<Prompt>;
	}
}
