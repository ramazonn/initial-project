import { Type } from "class-transformer";
import {
	IsBoolean,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	ValidateNested,
} from "class-validator";
import { PaymentType } from "src/common/database/Enums";
import { ObjDto } from "src/common/type";

export class CreateClientBalanceOperationDto {
	@IsNotEmpty()
	@IsNumber()
	amount!: number;

	@IsNotEmpty()
	@IsEnum(PaymentType)
	paymentType!: PaymentType;

	@IsNotEmpty()
	@Type(() => ObjDto)
	@ValidateNested({ each: true })
	client!: ObjDto;
}

// export class CreateClientBalanceFillingDto extends CreateClientBalanceOperationDto{ }
// export class CreateClientBalanceReturnDebtDto extends CreateClientBalanceOperationDto{ }
export class CreateClientBalancePayDebtDto extends CreateClientBalanceOperationDto {
	@IsNotEmpty()
	@Type(() => ObjDto)
	@ValidateNested({ each: true })
	contract!: ObjDto;

	@IsNotEmpty()
	@IsBoolean()
	fromBalance!: boolean;
}
