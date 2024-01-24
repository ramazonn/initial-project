import { Repository } from "typeorm";
import { ManufacturerBalanceEntity } from "../entity/Manufacturer-balance.entity";

export type ManufacturerBalanceRepository = Repository<ManufacturerBalanceEntity>;
