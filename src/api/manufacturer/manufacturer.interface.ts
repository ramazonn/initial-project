import { IFindOptions, IResponse } from "src/infrastructure/lib/baseService/interface";
import { ManufacturerEntity } from "src/core/entity/manufacturer.entity";
import { CreateManufacturerDto } from "./dto/create-manufacturer.dto";
import { UpdateManufacturerDto } from "./dto/update-manufacturer.dto";
import { IBaseService } from "src/common/interface/IBaseService";

export interface IManufacturerService
	extends IBaseService<CreateManufacturerDto, UpdateManufacturerDto, ManufacturerEntity> {
	// findAll(options?: IFindOptions<ManufacturerEntity>): Promise<IResponse<ManufacturerEntity[]>>;
	// findOneById(
	// 	id: number,
	// 	options?: IFindOptions<ManufacturerEntity>,
	// ): Promise<IResponse<ManufacturerEntity>>;
	// create(dto: CreateManufacturerDto): Promise<IResponse<ManufacturerEntity>>;
	// update(id: number, dto: UpdateManufacturerDto): Promise<IResponse<{}>>;
	// delete(id: number): Promise<IResponse<{}>>;
}
