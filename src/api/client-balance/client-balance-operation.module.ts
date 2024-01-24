import { Module } from "@nestjs/common";
import { ClientBalanceOperationService } from "./client-balance-operation.service";
import { ClientBalanceOperationController } from "./client-balance-operation.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientBalanceOperationEntity } from "src/core/entity/client-balance-operation.entity";
import { ProductSalesService } from "../product-sales/product-sales.service";
import { ClientService } from "../client/client.service";
import { ProductSalesContractEntity } from "src/core/entity/product-sales-contract.entity";
import { ClientEntity } from "src/core/entity/client.entity";
import { SoldProductEntity } from "src/core/entity/sold-product.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([
			ClientBalanceOperationEntity,
			ProductSalesContractEntity,
			ClientEntity,
			SoldProductEntity,
		]),
	],
	controllers: [ClientBalanceOperationController],
	providers: [
		{ provide: "IClientBalanceOperationService", useClass: ClientBalanceOperationService },
		{ provide: "IClientService", useClass: ClientService },
	],
})
export class ClientBalanceOperationModule {}
