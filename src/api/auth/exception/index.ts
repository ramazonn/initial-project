import { HttpException } from "@nestjs/common";
import { getPrompt } from "src/infrastructure/lib/prompts/prompts";

export class AuthorizationError extends HttpException {
	constructor() {
		super(JSON.stringify(getPrompt("application", "authorization_error")), 401);
	}
}
