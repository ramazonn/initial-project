import { IBaseService } from "src/common/interface/IBaseService";
import { ClientBalanceOperationEntity } from "src/core/entity/client-balance-operation.entity";
import { IResponse } from "src/infrastructure/lib/baseService/interface";
import {
	CreateClientBalancePayDebtDto,
	CreateClientBalanceOperationDto,
} from "./dto/create-client-balance-operation.dto";
import { UpdateClientBalanceOperationDto } from "./dto/update-client-balance-operation.dto";

export interface IClientBalanceOperationService
	extends IBaseService<
		CreateClientBalanceOperationDto,
		UpdateClientBalanceOperationDto,
		ClientBalanceOperationEntity
	> {
	clientPayDebt(
		dto: CreateClientBalancePayDebtDto,
	): Promise<IResponse<ClientBalanceOperationEntity>>;
	clientBalanceFilling(
		dto: CreateClientBalanceOperationDto,
	): Promise<IResponse<ClientBalanceOperationEntity>>;
	// debtCancellation(
	// 	dto: CreateClientBalanceDebtCancelationDto,
	// ): Promise<IResponse<ClientBalanceOperationEntity>>;
}
