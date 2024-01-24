import { Repository } from "typeorm";
import { ProductWarehouseEntity } from "../entity/product-warehouse.entity";

export type ProductWarehouseRepository = Repository<ProductWarehouseEntity>;
