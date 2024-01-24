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
import { ManufacturerService } from "./manufacturer.service";
import { CreateManufacturerDto } from "./dto/create-manufacturer.dto";
import { UpdateManufacturerDto } from "./dto/update-manufacturer.dto";
import { IManufacturerService } from "./manufacturer.interface";
import { ApiBearerAuth } from "@nestjs/swagger";
import { RolesDecorator } from "../auth/roles/RolesDecorator";
import { Roles } from "src/common/database/Enums";
import { JwtAuthGuard } from "../auth/user/AuthGuard";
import { RolesGuard } from "../auth/roles/RoleGuard";
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@RolesDecorator(Roles.ADMIN)
@Controller("manufacturer")
export class ManufacturerController {
	constructor(
		@Inject("IManufacturerService") private readonly manufacturerService: IManufacturerService,
	) {}

	@Post()
	create(@Body() createManufacturerDto: CreateManufacturerDto) {
		return this.manufacturerService.create(createManufacturerDto);
	}

	@Get()
	findAll() {
		return this.manufacturerService.findAll({ order: { createdAt: "ASC" } });
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.manufacturerService.findOneById(id);
	}

	@Patch(":id")
	update(
		@Param("id", ParseIntPipe) id: number,
		@Body() updateManufacturerDto: UpdateManufacturerDto,
	) {
		return this.manufacturerService.update(id, updateManufacturerDto);
	}

	@Delete(":id")
	remove(@Param("id", ParseIntPipe) id: number) {
		return this.manufacturerService.delete(id);
	}
}
