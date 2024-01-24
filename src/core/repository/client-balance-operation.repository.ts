import { Repository } from "typeorm";
import { ClientBalanceOperationEntity } from "../entity/client-balance-operation.entity";

export type ClientBalanceOperationRepository = Repository<ClientBalanceOperationEntity>;
