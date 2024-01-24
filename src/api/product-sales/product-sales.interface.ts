import { IFindOptions, IResponse } from "src/infrastructure/lib/baseService/interface";
import { ProductSalesContractEntity } from "src/core/entity/product-sales-contract.entity";
import { UpdateProductSalesDto } from "./dto/update-product-sales.dto";
import { IBaseService } from "src/common/interface/IBaseService";
import { CreateProductSalesDto } from "./dto/create-product-sales.dto";

// export interface IProductSalesService {
// 	findAll(options?: IFindOptions<ProductSalesContractEntity>): Promise<IResponse<ProductSalesContractEntity[]>>;
// 	findOneById(
// 		id: number,
// 		options?: IFindOptions<ProductSalesContractEntity>,
// 	): Promise<IResponse<ProductSalesContractEntity>>;
// 	createContract(dto: UpdateProductSalesDto): Promise<IResponse<ProductSalesContractEntity>>;
// 	update(id: number, dto: UpdateProductSalesDto): Promise<IResponse<{}>>;
// 	delete(id: number): Promise<IResponse<{}>>;
// }
export interface IProductSalesService
	extends IBaseService<CreateProductSalesDto, UpdateProductSalesDto, ProductSalesContractEntity> {
	createContract(dto: UpdateProductSalesDto): Promise<IResponse<ProductSalesContractEntity>>;
}
