import { Repository } from "typeorm";
import { ManufacturerEntity } from "../entity/manufacturer.entity";

export type ManufacturerRepository = Repository<ManufacturerEntity>;
