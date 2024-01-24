import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ManufacturerEntity } from "src/core/entity/manufacturer.entity";
import { ManufacturerRepository } from "src/core/repository/manufacturer.repository";
import { BaseService } from "src/infrastructure/lib/baseService";
import { CreateManufacturerDto } from "./dto/create-manufacturer.dto";
import { UpdateManufacturerDto } from "./dto/update-manufacturer.dto";
import { IManufacturerService } from "./manufacturer.interface";

@Injectable()
export class ManufacturerService
	extends BaseService<CreateManufacturerDto, UpdateManufacturerDto, ManufacturerEntity>
	implements IManufacturerService
{
	constructor(@InjectRepository(ManufacturerEntity) repository: ManufacturerRepository) {
		super(repository, "Manufacturer");
	}
	async update(id: number, dto: UpdateManufacturerDto) {
		const { data: foundManufacturer } = await this.findOneById(id);
		await this.getRepository.update(id, dto);
		return { data: {}, status: 200, message: "Manufacturer updated successfully" };
	}
}
