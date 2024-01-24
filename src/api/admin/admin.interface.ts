import { IFindOptions, IResponse } from "src/infrastructure/lib/baseService/interface";
import { AdminEntity } from "src/core/entity/admin.entity";
import { Repository } from "typeorm";
import { CreateAdminDto, CreateAdminDtoWithRole } from "./dto/create-admin.dto";
import { LoginDto } from "./dto/login-dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";

export interface IAdminService {
	get getRepository(): Repository<any>;

	findAllAdminsBySuperAdmin(
		options?: IFindOptions<AdminEntity>,
	): Promise<IResponse<AdminEntity[]>>;

	findOneById(id: number, options?: IFindOptions<AdminEntity>): Promise<IResponse<AdminEntity>>;

	createSuperAdmin(dto: CreateAdminDto): Promise<IResponse<AdminEntity>>;
	createAdmin(dto: CreateAdminDtoWithRole): Promise<IResponse<AdminEntity>>;
	
	login(dto: LoginDto): void;

	update(id: number, dto: UpdateAdminDto): Promise<IResponse<{}>>;

	delete(id: number): Promise<IResponse<{}>>;
}
