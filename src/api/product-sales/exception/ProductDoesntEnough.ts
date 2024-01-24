import { HttpException } from "@nestjs/common";
import { getPrompt } from "src/infrastructure/lib/prompts/prompts";

export class ProductDoesntEnough extends HttpException {
	constructor() {
		super(JSON.stringify(getPrompt("application", "product_doesnt_enough")), 404);
	}
}