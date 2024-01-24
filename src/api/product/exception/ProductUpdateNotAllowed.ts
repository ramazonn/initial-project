import { HttpException } from "@nestjs/common";
import { getPrompt } from "src/infrastructure/lib/prompts/prompts";

export class ProductUpdateNotAllowed extends HttpException {
	constructor() {
		super(JSON.stringify(getPrompt("application", "product_update_not_allowed")), 421);
	}
}