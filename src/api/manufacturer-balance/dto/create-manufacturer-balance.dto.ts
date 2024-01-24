import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import {  ManufacturerBalanceStatus, PaymentType } from "src/common/database/Enums";
import { ObjDto } from "src/common/type";

export class CreateManufacturerBalanceDto {
	@IsNotEmpty()
	@IsNumber()
	amount!: number;

	@IsNotEmpty()
	@IsEnum(ManufacturerBalanceStatus)
	status!: ManufacturerBalanceStatus;

	@IsNotEmpty()
	@IsEnum(PaymentType)
	paymentType!: PaymentType;

	@IsNotEmpty()
	@IsString()
	description!: string;

	@IsNotEmpty()
	@IsNumber()
	currency!: number;

	@IsNotEmpty()
	@Type(() => ObjDto)
	@ValidateNested({ each: true })
	manufacturer!: ObjDto;
}
