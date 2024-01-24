import { HttpException } from "@nestjs/common";
import { getPrompt } from "src/infrastructure/lib/prompts/prompts";

export class ProductNotFound extends HttpException {
	constructor() {
		super(JSON.stringify(getPrompt("application", "product_not_found")), 404);
	}
}