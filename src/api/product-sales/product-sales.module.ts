import { Module } from "@nestjs/common";
import { ProductSalesService } from "./product-sales.service";
import { ProductSalesController } from "./product-sales.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductSalesContractEntity } from "src/core/entity/product-sales-contract.entity";
import { ManufacturerService } from "../manufacturer/manufacturer.service";
import { ClientService } from "../client/client.service";
import { ClientEntity } from "src/core/entity/client.entity";
import { ManufacturerEntity } from "src/core/entity/manufacturer.entity";
import { ProductService } from "../product/product.service";
import { ProductEntity } from "src/core/entity/product.entity";
import { ProductWarehouseService } from "../product-warehouse/product-warehouse.service";
import { ProductWarehouseEntity } from "src/core/entity/product-warehouse.entity";
import { SoldProductEntity } from "src/core/entity/sold-product.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([
			ProductSalesContractEntity,
			ClientEntity,
			ManufacturerEntity,
			ProductEntity,
			ProductWarehouseEntity,
			SoldProductEntity,
		]),
	],
	controllers: [ProductSalesController],
	providers: [
		{ provide: "IProductSalesService", useClass: ProductSalesService },
		{ provide: "IClientService", useClass: ClientService },
		{ provide: "IManufacturerService", useClass: ManufacturerService },
		{ provide: "IProductService", useClass: ProductService },
		{ provide: "IProductWarehouseService", useClass: ProductWarehouseService },
	],
})
export class ProductSalesModule {}
