import { HttpException } from "@nestjs/common";
import { getPrompt } from "src/infrastructure/lib/prompts/prompts";

export class InvalidPhoneNumberException extends HttpException {
	constructor() {
		super(JSON.stringify(getPrompt("application", "invalid_phone_number")), 400);
	}
}
