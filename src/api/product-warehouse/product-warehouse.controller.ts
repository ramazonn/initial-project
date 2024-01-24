import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Inject,
	ParseIntPipe,
	UseGuards,
} from "@nestjs/common";
import { ProductWarehouseService } from "./product-warehouse.service";
import { CreateProductWarehouseDto } from "./dto/create-product-warehouse.dto";
import { UpdateProductWarehouseDto } from "./dto/update-product-warehouse.dto";
import { IProductWarehouseService } from "./product-warehouse.interface";
import { ApiBearerAuth } from "@nestjs/swagger";
import { RolesDecorator } from "../auth/roles/RolesDecorator";
import { Roles } from "src/common/database/Enums";
import { JwtAuthGuard } from "../auth/user/AuthGuard";
import { RolesGuard } from "../auth/roles/RoleGuard";
import { IManufacturerService } from "../manufacturer/manufacturer.interface";
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@RolesDecorator(Roles.ADMIN)
@Controller("product-warehouse")
export class ProductWarehouseController {
	constructor(
		@Inject("IProductWarehouseService")
		private readonly productWarehouseService: IProductWarehouseService,
		@Inject("IManufacturerService")
		private readonly manufacturerService: IManufacturerService,
	) {}

	@Post()
	async create(@Body() createProductWarehouseDto: CreateProductWarehouseDto) {
		await this.manufacturerService.findOneById(createProductWarehouseDto.manufacturer.id);
		return this.productWarehouseService.create(createProductWarehouseDto);
	}

	@Get()
	findAll() {
		return this.productWarehouseService.findAll({
			relations: { manufacturer: true },
			order: { createdAt: "ASC" },
		});
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.productWarehouseService.findOneById(id, { relations: { manufacturer: true } });
	}

	@Patch(":id")
	async update(
		@Param("id", ParseIntPipe) id: number,
		@Body() updateProductWarehouseDto: UpdateProductWarehouseDto,
	) {
		if (updateProductWarehouseDto.manufacturer?.id) {
			await this.manufacturerService.findOneById(updateProductWarehouseDto.manufacturer.id);
		}

		return this.productWarehouseService.update(id, updateProductWarehouseDto);
	}

	@Delete(":id")
	remove(@Param("id", ParseIntPipe) id: number) {
		return this.productWarehouseService.delete(id);
	}
}
