import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsNumber, IsOptional } from "class-validator";
import { ContractStatus } from "src/common/database/Enums";
import { PaginationDto } from "src/common/dto/pagination.dto";

export class ProductSalesQuery extends PaginationDto {
	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	clientId!: number;

	@IsOptional()
	@IsEnum(ContractStatus)
	status!: ContractStatus;
}
