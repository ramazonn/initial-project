import { IFindOptions, IResponse } from "src/infrastructure/lib/baseService/interface";
import { IBaseService } from "src/common/interface/IBaseService";
import { ProductEntity } from "src/core/entity/product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

// export interface IProductService {
// 	get getRepository(): Repository<any>;
// 	findAll(options?: IFindOptions<ProductEntity>): Promise<IResponse<ProductEntity[]>>;
// 	findOneById(
// 		id: number,
// 		options?: IFindOptions<ProductEntity>,
// 	): Promise<IResponse<ProductEntity>>;
// 	createProduct(dto: CreateProductDto): Promise<IResponse<ProductEntity>>;
// update(id: number, dto: UpdateProductDto): Promise<IResponse<{}>>;
	
// 	delete(id: number): Promise<IResponse<{}>>;
// }
export interface IProductService extends IBaseService<CreateProductDto, UpdateProductDto, ProductEntity> {
	createProduct(dto: CreateProductDto): Promise<IResponse<ProductEntity>>;
}
