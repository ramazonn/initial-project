import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { ManufacturerBalanceStatus } from "src/common/database/Enums";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { ObjDto } from "src/common/type";

export class ManufacturerBalanceQuery extends PaginationDto {
	@IsOptional()
	@IsNotEmpty()
	@IsEnum(ManufacturerBalanceStatus)
	status!: ManufacturerBalanceStatus;

	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	@Type(() => Number)
	manufacturerId!: number;
}
