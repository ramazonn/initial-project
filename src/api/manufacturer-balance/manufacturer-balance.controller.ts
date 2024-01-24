import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseIntPipe,
	Inject,
	UseGuards,
	Query,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Roles } from "src/common/database/Enums";
import { ManufacturerBalanceEntity } from "src/core/entity/manufacturer-balance.entity";
import { IFindOptions } from "src/infrastructure/lib/baseService/interface";
import { RolesGuard } from "../auth/roles/RoleGuard";
import { RolesDecorator } from "../auth/roles/RolesDecorator";
import { JwtAuthGuard } from "../auth/user/AuthGuard";
import { IManufacturerService } from "../manufacturer/manufacturer.interface";
import { CreateManufacturerBalanceDto } from "./dto/create-manufacturer-balance.dto";
import { ManufacturerBalanceQuery } from "./dto/manufacturer-balance-query";
import { UpdateManufacturerBalanceDto } from "./dto/update-manufacturer-balance.dto";
import { IManufacturerBalanceService } from "./manufacturer-balance.interface";
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@RolesDecorator(Roles.ADMIN, Roles.MANAGER)
@Controller("manufacturer-balance")
export class ManufacturerBalanceController {
	constructor(
		@Inject("IManufacturerBalanceService")
		private readonly manufacturerBalanceService: IManufacturerBalanceService,
	) {}

	@Post()
	async creat(@Body() createManufacturerBalanceDto: CreateManufacturerBalanceDto) {
		return this.manufacturerBalanceService.createManufacturerBalance(
			createManufacturerBalanceDto,
		);
	}

	@Get()
	findAll(@Query() query: ManufacturerBalanceQuery) {
		return this.manufacturerBalanceService.findAllWithPagination({
			skip: query.page,
			take: query.pageSize,
			where: { manufacturer: { id: query?.manufacturerId }, status: query?.status },
			relations: { manufacturer: true },
		});
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.manufacturerBalanceService.findOneById(id);
	}

	@Patch(":id")
	update(
		@Param("id", ParseIntPipe) id: number,
		@Body() updateManufacturerBalanceDto: UpdateManufacturerBalanceDto,
	) {
		return this.manufacturerBalanceService.update(id, updateManufacturerBalanceDto);
	}

	@Delete(":id")
	remove(@Param("id", ParseIntPipe) id: number) {
		return this.manufacturerBalanceService.delete(id);
	}
}
