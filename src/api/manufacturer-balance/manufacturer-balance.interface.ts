import { IBaseService } from "src/common/interface/IBaseService";
import { ManufacturerBalanceEntity } from "src/core/entity/manufacturer-balance.entity";
import { IResponse } from "src/infrastructure/lib/baseService/interface";
import { CreateManufacturerBalanceDto } from "./dto/create-manufacturer-balance.dto";
import { UpdateManufacturerBalanceDto } from "./dto/update-manufacturer-balance.dto";

export interface IManufacturerBalanceService
	extends IBaseService<
		CreateManufacturerBalanceDto,
		UpdateManufacturerBalanceDto,
		ManufacturerBalanceEntity
	> {
	createManufacturerBalance(
		dto: CreateManufacturerBalanceDto,
	): Promise<IResponse<ManufacturerBalanceEntity>>;
}
