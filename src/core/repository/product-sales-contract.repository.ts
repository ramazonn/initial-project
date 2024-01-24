import { Repository } from 'typeorm';
import { ProductSalesContractEntity } from "../entity/product-sales-contract.entity";

export type ProductSalesContractRepository = Repository<ProductSalesContractEntity>;
