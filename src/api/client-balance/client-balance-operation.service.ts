import { BadRequestException, HttpException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClientBalanceOperationStatus, ContractStatus } from "src/common/database/Enums";
import { ClientBalanceOperationEntity } from "src/core/entity/client-balance-operation.entity";
import { ProductSalesContractEntity } from "src/core/entity/product-sales-contract.entity";
import { ClientBalanceOperationRepository } from "src/core/repository/client-balance-operation.repository";
import { ProductSalesContractRepository } from "src/core/repository/product-sales-contract.repository";
import { BaseService } from "src/infrastructure/lib/baseService";
import { IResponse } from "src/infrastructure/lib/baseService/interface";
import { IClientService } from "../client/client.interface";
import { IProductSalesService } from "../product-sales/product-sales.interface";
import { IClientBalanceOperationService } from "./client-balance-operation.interface";
import {
	CreateClientBalancePayDebtDto,
	CreateClientBalanceOperationDto,
} from "./dto/create-client-balance-operation.dto";
import { UpdateClientBalanceOperationDto } from "./dto/update-client-balance-operation.dto";

@Injectable()
export class ClientBalanceOperationService
	extends BaseService<
		CreateClientBalanceOperationDto,
		UpdateClientBalanceOperationDto,
		ClientBalanceOperationEntity
	>
	implements IClientBalanceOperationService
{
	constructor(
		@InjectRepository(ClientBalanceOperationEntity)
		repository: ClientBalanceOperationRepository,
		@InjectRepository(ProductSalesContractEntity)
		private readonly productSalesRepository: ProductSalesContractRepository,

		// @Inject("IProductSalesService") private readonly productSales: IProductSalesService,
		@Inject("IClientService") private readonly clientService: IClientService,
	) {
		super(repository, "ClientBalanceOperation");
	}
	async clientBalanceFilling(dto: CreateClientBalanceOperationDto) {
		const { data: client } = await this.clientService.findOneById(dto.client.id);

		let balance = new ClientBalanceOperationEntity();
		balance.amount = dto.amount;
		balance.client = client;
		balance.paymentType = dto.paymentType;
		balance.status = ClientBalanceOperationStatus.FILL;
		client.balance = Number(client.balance) + Number(dto.amount);

		await this.clientService.getRepository.save(client);
		await this.getRepository.save(balance);

		return { data: balance, status: 201, message: "created" };
	}
	async clientPayDebt(dto: CreateClientBalancePayDebtDto) {
		const { data: client } = await this.clientService.findOneById(dto.client.id);
		const contract = await this.productSalesRepository.findOne({
			where: { id: dto.contract.id },
			relations: { client: true },
		});
		if (!contract) {
			throw new HttpException("Contract not found", 404);
		}

		if (client.id !== contract.client.id || Number(contract.soldPrice) !== dto.amount) {
			throw new BadRequestException();
		}
		if (dto.fromBalance) {
			if (Number(client.balance) < dto.amount) {
				throw new HttpException("low amount", 400);
			}
			console.log("uxlamadi");

			client.balance = Number(client.balance) - dto.amount;
			await this.clientService.getRepository.save(client);
		}

		let balance = new ClientBalanceOperationEntity();
		balance.amount = dto.amount;
		balance.client = client;
		balance.paymentType = dto.paymentType;
		balance.contract = contract;
		balance.status = ClientBalanceOperationStatus.DEBT;
		contract.status = ContractStatus.PAID;

		await this.productSalesRepository.save(contract);
		await this.getRepository.save(balance);

		return { data: balance, status: 201, message: "created" };
	}
	// async debtCancellation(dto: CreateClientBalanceDebtCancelationDto) {
	// 	const { data: client } = await this.clientService.findOneById(dto.client.id);
	// 	const contract = await this.productSalesRepository.findOne({
	// 		where: { id: dto.contract.id },
	// 		relations: { client: true },
	// 	});
	// 	if (!contract) {
	// 		throw new HttpException("Contract not found", 404);
	// 	}

	// 	if (client.id !== contract.client.id || Number(contract.soldPrice) !== dto.amount) {
	// 		throw new BadRequestException();
	// 	}

	// 	if (Number(client.balance) < dto.amount) {
	// 		throw new HttpException("low amount", 400);
	// 	}

	// 	let balance = new ClientBalanceOperationEntity();
	// 	balance.amount = dto.amount;
	// 	balance.client = client;
	// 	balance.paymentType = dto.paymentType;
	// 	balance.contract = contract;
	// 	balance.status = ClientBalanceOperationStatus.DEBT;
	// 	contract.status = ContractStatus.PAID;
	// 	client.balance = Number(client.balance) - dto.amount;

	// 	await this.clientService.getRepository.save(client);
	// 	await this.productSalesRepository.save(contract);
	// 	await this.getRepository.save(balance);

	// 	return { data: balance, status: 201, message: "created" };
	// }
	async update(id: number, updateBalanceDto: UpdateClientBalanceOperationDto) {
		return { data: {}, status: 200, message: "updated" };
	}
}
