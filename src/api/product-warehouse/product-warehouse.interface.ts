import { IFindOptions, IResponse } from "src/infrastructure/lib/baseService/interface";
import { ProductWarehouseEntity } from "src/core/entity/product-warehouse.entity";
import { CreateProductWarehouseDto } from "./dto/create-product-warehouse.dto";
import { UpdateProductWarehouseDto } from "./dto/update-product-warehouse.dto";

export interface IProductWarehouseService {
	findAll(
		options?: IFindOptions<ProductWarehouseEntity>,
	): Promise<IResponse<ProductWarehouseEntity[]>>;
	findOneById(
		id: number,
		options?: IFindOptions<ProductWarehouseEntity>,
	): Promise<IResponse<ProductWarehouseEntity>>;
	create(dto: CreateProductWarehouseDto): Promise<IResponse<ProductWarehouseEntity>>;

	update(id: number, dto: UpdateProductWarehouseDto): Promise<IResponse<{}>>;
	delete(id: number): Promise<IResponse<{}>>;
}
