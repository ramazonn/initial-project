import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ManufacturerBalanceStatus } from "src/common/database/Enums";
import { ManufacturerBalanceEntity } from "src/core/entity/manufacturer-balance.entity";
import { ManufacturerBalanceRepository } from "src/core/repository/manufacturer-balance.repository";
import { BaseService } from "src/infrastructure/lib/baseService";
import { IManufacturerService } from "../manufacturer/manufacturer.interface";
import { CreateManufacturerBalanceDto } from "./dto/create-manufacturer-balance.dto";
import { UpdateManufacturerBalanceDto } from "./dto/update-manufacturer-balance.dto";
import { IManufacturerBalanceService } from "./manufacturer-balance.interface";

@Injectable()
export class ManufacturerBalanceService
	extends BaseService<
		CreateManufacturerBalanceDto,
		UpdateManufacturerBalanceDto,
		ManufacturerBalanceEntity
	>
	implements IManufacturerBalanceService
{
	constructor(
		@InjectRepository(ManufacturerBalanceEntity) repository: ManufacturerBalanceRepository,
		@Inject("IManufacturerService")
		private readonly manufacturerService: IManufacturerService,
	) {
		super(repository, "Manufacturer Balance operation");
	}
	async createManufacturerBalance(dto: CreateManufacturerBalanceDto) {
		let { data: manufacturer } = await this.manufacturerService.findOneById(
			dto.manufacturer.id,
		);
		if (dto.status === ManufacturerBalanceStatus.INCOME) {
			manufacturer.balance = Number(manufacturer.balance) - dto.amount;
		} else {
			manufacturer.balance = Number(manufacturer.balance) + dto.amount;
		}
		await this.manufacturerService.getRepository.save(manufacturer);
		return await this.create(dto);
		// return { data: {}, status: 200, message: "created" };
	}
	async update(id: number, updateManufacturerBalanceDto: UpdateManufacturerBalanceDto) {
		return { data: {}, status: 200, message: "update" };
	}
}
