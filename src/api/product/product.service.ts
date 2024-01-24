import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "src/core/entity/product.entity";
import { ProductRepository } from "src/core/repository/product.repository";
import { BaseService } from "src/infrastructure/lib/baseService";
import { IProductWarehouseService } from "../product-warehouse/product-warehouse.interface";
import { ProductWarehouseService } from "../product-warehouse/product-warehouse.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductUpdateNotAllowed } from "./exception/ProductUpdateNotAllowed";
import { IProductService } from "./product.interface";

@Injectable()
export class ProductService
extends BaseService<CreateProductDto, UpdateProductDto, ProductEntity>
implements IProductService
{
	constructor(
		@InjectRepository(ProductEntity) repository: ProductRepository,
		@Inject("IProductWarehouseService")
		private readonly productWarehouseService: IProductWarehouseService,
	) {
		super(repository, "Product");
	}
	async createProduct(dto: CreateProductDto) {
		await this.productWarehouseService.findOneById(dto.productWarehouse.id);
		let foundProduct = (await this.getRepository.findOne({
			where: {
				productWarehouse: { id: dto.productWarehouse.id },
				originPrice: dto.originPrice,
				sellingPrice: dto.sellingPrice,
			},
		})) as ProductEntity;
		let result;
		if (foundProduct) {
			foundProduct.quantity = Number(foundProduct.quantity) + dto.quantity;
			await this.getRepository.save(foundProduct);
			result = foundProduct;
		} else {
			const { data: newProduct } = await this.create(dto);
			result = newProduct;
		}
		return { data: result, status: 201, message: "Product created" };
	}
	async update(id: number, dto: UpdateProductDto) {
		if (dto.productWarehouse?.id) {
			await this.productWarehouseService.findOneById(dto.productWarehouse.id);
		}
		const { data: oldProduct } = await this.findOneById(id, {
			relations: { productWarehouse: true },
		});

		if (dto.originPrice && dto.sellingPrice) {
			let sameProduct = (await this.getRepository.findOne({
				where: {
					originPrice: dto.originPrice,
					sellingPrice: dto.sellingPrice,
				},
				relations: { productWarehouse: true },
			})) as ProductEntity;
			if (
				sameProduct &&
				(sameProduct.productWarehouse.id === oldProduct.productWarehouse.id ||
					sameProduct.productWarehouse.id === dto.productWarehouse?.id)
			) {
				throw new ProductUpdateNotAllowed();
			}
		}

		await this.getRepository.update(id, dto);

		return { data: {}, status: 200, message: "Product updated" };
	}
}
