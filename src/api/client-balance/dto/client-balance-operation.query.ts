import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { ClientBalanceOperationStatus } from "src/common/database/Enums";
import { PaginationDto } from "src/common/dto/pagination.dto";

export class ClientBalanceOperationQuery extends PaginationDto {
	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	clientId!: number;

	@IsOptional()
	@IsEnum(ClientBalanceOperationStatus)
	status!: ClientBalanceOperationStatus;
}
