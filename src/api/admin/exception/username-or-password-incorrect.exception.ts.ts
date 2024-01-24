import { HttpException } from "@nestjs/common";
import { getPrompt } from "src/infrastructure/lib/prompts/prompts";

export class UsernameOrPasswordIncorrect extends HttpException {
	constructor() {
		super(JSON.stringify(getPrompt("application", "username_or_password_incorrect")), 400);
	}
}
