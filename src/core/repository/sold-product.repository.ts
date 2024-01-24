import { Repository } from 'typeorm';
import { SoldProductEntity } from "../entity/sold-product.entity";

export type SoldProductRepository = Repository<SoldProductEntity>;
