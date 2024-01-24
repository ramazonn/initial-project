import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	ParseIntPipe,
	Inject,
	UseGuards,
	Req,
	Put,
	ConflictException,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/common/database/Enums";
import { IFindOptions } from "src/infrastructure/lib/baseService/interface";
import { RequestWithPayload } from "src/common/type";
import { AdminEntity } from "src/core/entity/admin.entity";
import { RolesGuard } from "../auth/roles/RoleGuard";
import { Public, RolesDecorator } from "../auth/roles/RolesDecorator";
import { JwtAuthGuard } from "../auth/user/AuthGuard";
import { IAdminService } from "./admin.interface";
import { AdminService } from "./admin.service";
import { CreateAdminDto, CreateAdminDtoWithRole } from "./dto/create-admin.dto";
import { LoginDto } from "./dto/login-dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { ForbiddenException } from "./exception/forbiddern.exception";

// @ApiBearerAuth()
// @UseGuards(RolesGuard,JwtAuthGuard)
@ApiTags("admin")
@Controller("admin")
export class AdminController {
	constructor(@Inject("IAdminService") private readonly adminService: IAdminService) {}

	@Post("super")
	async createSuperAdmin(@Body() createSuperAdminDto: CreateAdminDto) {
		return await this.adminService.createSuperAdmin(createSuperAdminDto);
	}

	@Public()
	@Post("login")
	async login(@Body() loginDto: LoginDto) {
		return await this.adminService.login(loginDto);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RolesDecorator(Roles.ADMIN)
	@Get()
	async findAll(@Req() req: RequestWithPayload) {
		return await this.adminService.findAllAdminsBySuperAdmin();
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RolesDecorator(Roles.ADMIN)
	@Get(":id")
	async findOne(@Req() req: RequestWithPayload, @Param("id", ParseIntPipe) id: number) {
		const { data: foundAdmin } = await this.adminService.findOneById(id);

		if (foundAdmin.role === Roles.ADMIN) {
			throw new ForbiddenException();
		}
		return { data: foundAdmin, status: 200, message: "get single admin successfully recieved" };
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RolesDecorator(Roles.ADMIN)
	@Post()
	async createAdmin(
		@Req() req: RequestWithPayload,
		@Body() createAdminDto: CreateAdminDtoWithRole,
	) {
		// prevention to admin will not create admin
		if (req.user.role === createAdminDto.role) {
			throw new ForbiddenException();
		}

		return await this.adminService.createAdmin(createAdminDto);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RolesDecorator(Roles.ADMIN)
	@Put(":id")
	async update(
		@Req() req: RequestWithPayload,
		@Param("id", ParseIntPipe) id: number,
		@Body() updateAdminDto: UpdateAdminDto,
	) {
		if (req.user.id === id || updateAdminDto.role === Roles.ADMIN) {
			throw new ForbiddenException();
		}
		const { data: foundAdmin } = await this.adminService.findOneById(id);
		if (foundAdmin.role === Roles.ADMIN) {
			throw new ForbiddenException();
		}

		return await this.adminService.update(id, updateAdminDto);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RolesDecorator(Roles.ADMIN)
	@Delete(":id")
	async remove(@Req() req: RequestWithPayload, @Param("id", ParseIntPipe) id: number) {
		if (req.user.id === id) {
			throw new ForbiddenException();
		}
		const { data: foundAdmin } = await this.adminService.findOneById(id);

		if (foundAdmin.role === Roles.ADMIN) {
			throw new ForbiddenException();
		}

		return this.adminService.delete(id);
	}
}
