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
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { IProductService } from "./product.interface";
import { ApiBearerAuth } from "@nestjs/swagger";
import { RolesDecorator } from "../auth/roles/RolesDecorator";
import { JwtAuthGuard } from "../auth/user/AuthGuard";
import { RolesGuard } from "../auth/roles/RoleGuard";
import { Roles } from "src/common/database/Enums";
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("product")
export class ProductController {
	constructor(@Inject("IProductService") private readonly productService: IProductService) {}

	@RolesDecorator(Roles.ADMIN)
	@Post()
	create(@Body() createProductDto: CreateProductDto) {
		return this.productService.createProduct(createProductDto);
	}

	@RolesDecorator(Roles.ADMIN, Roles.MANAGER)
	@Get()
	findAll() {
		return this.productService.findAll({ relations: { productWarehouse: true },order:{createdAt:"ASC"} });
	}

	@RolesDecorator(Roles.ADMIN, Roles.MANAGER)
	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.productService.findOneById(id, { relations: { productWarehouse: true } });
	}
	@RolesDecorator(Roles.ADMIN)
	@Patch(":id")
	update(@Param("id", ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
		return this.productService.update(id, updateProductDto);
	}

	@RolesDecorator(Roles.ADMIN)
	@Delete(":id")
	remove(@Param("id", ParseIntPipe) id: number) {
		return this.productService.delete(id);
	}
}
