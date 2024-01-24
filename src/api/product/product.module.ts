import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "src/core/entity/product.entity";
import { ProductWarehouseService } from "../product-warehouse/product-warehouse.service";
import { ProductWarehouseEntity } from "src/core/entity/product-warehouse.entity";

@Module({
	imports: [TypeOrmModule.forFeature([ProductEntity, ProductWarehouseEntity])],
	controllers: [ProductController],
	providers: [
		{ provide: "IProductService", useClass: ProductService },
		{ provide: "IProductWarehouseService", useClass: ProductWarehouseService },
	],
})
export class ProductModule {}
