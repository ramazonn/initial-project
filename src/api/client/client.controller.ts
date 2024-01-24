import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Inject,
	ParseIntPipe,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Roles } from "src/common/database/Enums";
import { RolesGuard } from "../auth/roles/RoleGuard";
import { RolesDecorator } from "../auth/roles/RolesDecorator";
import { JwtAuthGuard } from "../auth/user/AuthGuard";
import { IClientService } from "./client.interface";
import { ClientService } from "./client.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@RolesDecorator(Roles.ADMIN)
@Controller("client")
export class ClientController {
	constructor(
		@Inject("IClientService")
		private readonly clientService: IClientService,
	) {}

	@Post()
	create(@Body() createClientDto: CreateClientDto) {
		return this.clientService.create(createClientDto);
	}

	@Get()
	findAll() {
		return this.clientService.findAll({ order: { createdAt: "ASC" } });
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.clientService.findOneById(id);
	}

	@Patch(":id")
	update(@Param("id", ParseIntPipe) id: number, @Body() updateClientDto: UpdateClientDto) {
		return this.clientService.update(id, updateClientDto);
	}

	@Delete(":id")
	remove(@Param("id", ParseIntPipe) id: number) {
		return this.clientService.delete(id);
	}
}
