import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClientEntity } from "src/core/entity/client.entity";
import { ClientRepository } from "src/core/repository/client.repository";
import { BaseService } from "src/infrastructure/lib/baseService";
import { IClientService } from "./client.interface";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";

@Injectable()
export class ClientService
	extends BaseService<CreateClientDto, UpdateClientDto, ClientEntity>
	implements IClientService
{
	constructor(@InjectRepository(ClientEntity) repository: ClientRepository) {
		super(repository, "Client");
	}
	async update(id: number, dto: UpdateClientDto) {
		let { data: foundData } = await this.findOneById(id);
		await this.getRepository.update(id,dto);

		return { data: {}, status: 200, message: "admin details updated" };
	}
}
