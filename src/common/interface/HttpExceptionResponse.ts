import * as J from "fp-ts/Json";

import { Prompt } from "../../infrastructure/lib/prompts/types";

export interface HttpExceptionResponse {
	statusCode: number;
	error: string;
	// message: string | string[];
	message: Omit<Prompt, "status" | "code"> | J.Json;
}

export interface CustomHttpExceptionResponse extends HttpExceptionResponse {
	path: string;
	method: string;
	timeStamp: Date;
	correlationId: string;
}
