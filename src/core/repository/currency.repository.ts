import { Repository } from "typeorm";
import { CurrencyEntity } from "../entity/currency.entity";

export type CurrencyRepository = Repository<CurrencyEntity>;
