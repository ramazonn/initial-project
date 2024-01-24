import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCurrencyDto {
	@IsNotEmpty()
	@IsString()
	name!: string;

	@IsNotEmpty()
	@IsString()
	symbol!: string;

	@IsNotEmpty()
	@IsNumber()
	amount!: number;
}
