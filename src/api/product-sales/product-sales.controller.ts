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
	Query,
} from "@nestjs/common";
import { CreateProductSalesDto } from "./dto/create-product-sales.dto";
import { UpdateProductSalesDto } from "./dto/update-product-sales.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/user/AuthGuard";
import { RolesGuard } from "../auth/roles/RoleGuard";
import { RolesDecorator } from "../auth/roles/RolesDecorator";
import { ContractStatus, Roles } from "src/common/database/Enums";
import { IProductSalesService } from "./product-sales.interface";
import { GenerateContractIndex } from "src/infrastructure/lib/generate-contract-index";
import { ProductSalesQuery } from "./dto/product-sales-query";
import { FindOptionsUtils } from "typeorm";
import { ProductSalesContractEntity } from "src/core/entity/product-sales-contract.entity";
import { IFindOptions } from "src/infrastructure/lib/baseService/interface";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@RolesDecorator(Roles.ADMIN, Roles.MANAGER)
@Controller("product-sales")
export class ProductSalesController {
	constructor(
		@Inject("IProductSalesService")
		private readonly sellProductService: IProductSalesService,
	) {}

	@Post()
	create(@Body() createSellProductDto: CreateProductSalesDto) {
		return this.sellProductService.createContract(createSellProductDto);
	}

	@Get()
	findAll(@Query() query: ProductSalesQuery) {
		return this.sellProductService.findAllWithPagination({
			skip: query.page,
			take: query.pageSize,
			where: { client: { id: query?.clientId }, status: query?.status },
			relations: { client: true },
		});
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.sellProductService.findOneById(id, { relations: { soldProducts: true } });
	}

	// @Patch(":id")
	// update(
	// 	@Param("id", ParseIntPipe) id: number,
	// 	@Body() updateSellProductDto: UpdateProductSalesDto,
	// ) {
	// 	return this.sellProductService.update(id, updateSellProductDto);
	// }

	@Delete(":id")
	remove(@Param("id", ParseIntPipe) id: number) {
		return this.sellProductService.delete(id);
	}
}
