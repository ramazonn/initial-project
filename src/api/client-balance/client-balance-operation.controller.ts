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
	Query,
	UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Roles } from "src/common/database/Enums";
import { ClientBalanceOperationEntity } from "src/core/entity/client-balance-operation.entity";
import { IFindOptions } from "src/infrastructure/lib/baseService/interface";
import { RolesGuard } from "../auth/roles/RoleGuard";
import { RolesDecorator } from "../auth/roles/RolesDecorator";
import { JwtAuthGuard } from "../auth/user/AuthGuard";
import { IClientBalanceOperationService } from "./client-balance-operation.interface";
import { ClientBalanceOperationQuery } from "./dto/client-balance-operation.query";
// import { BalanceService } from './balance.service';
import {
	CreateClientBalancePayDebtDto,
	CreateClientBalanceOperationDto,
} from "./dto/create-client-balance-operation.dto";
import { UpdateClientBalanceOperationDto } from "./dto/update-client-balance-operation.dto";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@RolesDecorator(Roles.ADMIN, Roles.MANAGER)
@Controller("client-balance")
export class ClientBalanceOperationController {
	constructor(
		@Inject("IClientBalanceOperationService")
		private readonly balanceService: IClientBalanceOperationService,
	) {}

	@Post("/filling")
	clientBalanceFilling(@Body() createBalanceDto: CreateClientBalanceOperationDto) {
		return this.balanceService.clientBalanceFilling(createBalanceDto);
	}

	@Post("/pay-debt")
	clientPayDebt(@Body() createBalanceDto: CreateClientBalancePayDebtDto) {
		console.log(createBalanceDto);

		return this.balanceService.clientPayDebt(createBalanceDto);
	}

	@Get("/operation")
	findAll(@Query() query: ClientBalanceOperationQuery) {
		let options: IFindOptions<ClientBalanceOperationEntity> = {};
		if (query?.clientId) {
			// options.where={client:{id:qu}}
		}
		return this.balanceService.findAllWithPagination({
			skip: query.page,
			take: query.pageSize,
			where: { client: { id: query?.clientId }, status: query?.status },
			relations: { client: true },
		});
	}

	@Get("/operation/:id")
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.balanceService.findOneById(id, { relations: { client: true } });
	}

	@Delete(":id")
	remove(@Param("id", ParseIntPipe) id: number) {
		return this.balanceService.delete(id);
	}
}
