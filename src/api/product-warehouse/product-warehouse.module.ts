import { Module } from "@nestjs/common";
import { ProductWarehouseService } from "./product-warehouse.service";
import { ProductWarehouseController } from "./product-warehouse.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductWarehouseEntity } from "src/core/entity/product-warehouse.entity";
import { ManufacturerService } from "../manufacturer/manufacturer.service";
import { ManufacturerEntity } from "src/core/entity/manufacturer.entity";

@Module({
	imports: [TypeOrmModule.forFeature([ProductWarehouseEntity, ManufacturerEntity])],
	controllers: [ProductWarehouseController],
	providers: [
		{ provide: "IProductWarehouseService", useClass: ProductWarehouseService },
		{ provide: "IManufacturerService", useClass: ManufacturerService },
	],
})
export class ProductWarehouseModule {}
