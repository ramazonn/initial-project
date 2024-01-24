import { HttpException } from "@nestjs/common";
import { getPrompt } from "src/infrastructure/lib/prompts/prompts";

export class ForbiddenException extends HttpException {
	constructor() {
		super(JSON.stringify(getPrompt("application", "forbidden_exception")), 403);
	}
}
