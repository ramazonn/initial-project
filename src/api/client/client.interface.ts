import { IFindOptions, IResponse } from "src/infrastructure/lib/baseService/interface";
import { ClientEntity } from "src/core/entity/client.entity";
import { Repository } from "typeorm";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";

export interface IClientService {
	get getRepository(): Repository<any>;

	findAll(options?: IFindOptions<ClientEntity>): Promise<IResponse<ClientEntity[]>>;

	findOneById(id: number, options?: IFindOptions<ClientEntity>): Promise<IResponse<ClientEntity>>;

	create(dto: CreateClientDto): Promise<IResponse<ClientEntity>>;

	update(id: number, dto: UpdateClientDto): Promise<IResponse<{}>>;

	delete(id: number): Promise<IResponse<{}>>;
}
