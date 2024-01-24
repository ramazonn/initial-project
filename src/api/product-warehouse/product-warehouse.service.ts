import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductWarehouseEntity } from "src/core/entity/product-warehouse.entity";
import { ProductWarehouseRepository } from "src/core/repository/product-warehouse.repository";
import { BaseService } from "src/infrastructure/lib/baseService";
import { CreateProductWarehouseDto } from "./dto/create-product-warehouse.dto";
import { UpdateProductWarehouseDto } from "./dto/update-product-warehouse.dto";
import { IProductWarehouseService } from "./product-warehouse.interface";

@Injectable()
export class ProductWarehouseService
	extends BaseService<
		CreateProductWarehouseDto,
		UpdateProductWarehouseDto,
		ProductWarehouseEntity
	>
	implements IProductWarehouseService
{
	constructor(@InjectRepository(ProductWarehouseEntity) repository: ProductWarehouseRepository) {
		super(repository, "ProductWarehouse");
	}
	async update(id: number, dto: UpdateProductWarehouseDto) {
		await this.findOneById(id);
		await this.getRepository.update(id, dto);
		return { data: {}, status: 200, message: "ProductWarehouse updated" };
	}
}
