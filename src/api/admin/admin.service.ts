import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Roles } from "src/common/database/Enums";
import { AdminEntity } from "src/core/entity/admin.entity";
import { AdminRepository } from "src/core/repository/admin.repository";
import { BaseService } from "src/infrastructure/lib/baseService";
import { BcryptEncryption } from "src/infrastructure/lib/bcrypt";
import { IAdminService } from "./admin.interface";
import { CreateAdminDto, CreateAdminDtoWithRole } from "./dto/create-admin.dto";
import { LoginDto } from "./dto/login-dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { UsernameOrPasswordIncorrect } from "./exception/username-or-password-incorrect.exception.ts";
import { QueryFailedError, TypeORMError } from "typeorm";
import { InvalidPhoneNumberException } from "./exception/InvalidPhoneNUmber.exception";
@Injectable()
export class AdminService
	extends BaseService<CreateAdminDto, UpdateAdminDto, AdminEntity>
	implements IAdminService
{
	constructor(
		@InjectRepository(AdminEntity) repository: AdminRepository,
		private jwtService: JwtService,
	) {
		super(repository, "Admin");
	}
	async findAllAdminsBySuperAdmin() {
		const admins = await this.getRepository
			.createQueryBuilder("admin")
			.where("admin.role != :superAdmin", { superAdmin: Roles.ADMIN })
			.getMany();
		return { data: admins, status: 200, message: "all admins" };
	}
	async createSuperAdmin(dto: CreateAdminDto) {
		const isValidPhoneNUmber = this.checkPhoneNumber(dto.phoneNumber);
		if (!isValidPhoneNUmber) {
			throw new InvalidPhoneNumberException();
		}
		const hashshedPassword = await BcryptEncryption.encrypt(dto.password);

		const newSuperAdmin = await this.getRepository.save(
			this.getRepository.create({
				fullName: dto.fullName,
				username: dto.username,
				password: hashshedPassword,
				phoneNumber: dto.phoneNumber,
				role: Roles.ADMIN,
			}),
		);

		return { data: newSuperAdmin, status: 201, message: "success" };
	}

	async createAdmin(dto: CreateAdminDtoWithRole) {
		const isValidPhoneNUmber = this.checkPhoneNumber(dto.phoneNumber);
		if (!isValidPhoneNUmber) {
			throw new InvalidPhoneNumberException();
		}
		const hashshedPassword = await BcryptEncryption.encrypt(dto.password);

		const newAdmin = await this.getRepository.save(
			this.getRepository.create({
				fullName: dto.fullName,
				username: dto.username,
				password: hashshedPassword,
				phoneNumber: dto.phoneNumber,
				role: dto.role,
			}),
		);
		return { data: newAdmin, status: 201, message: "succes" };
	}
	async login(dto: LoginDto) {
		const admin: AdminEntity = await this.getRepository.findOne({
			where: { username: dto.username },
		});

		if (!admin) {
			throw new UsernameOrPasswordIncorrect();
		}
		const compare = await BcryptEncryption.compare(dto.password, admin.password);

		if (!compare) {
			throw new UsernameOrPasswordIncorrect();
		}

		const payload = { id: admin.id, role: admin.role };
		return {
			access_token: await this.jwtService.signAsync(payload),
			data: admin,
			status: 200,
			message: "successfully logged in",
		};
	}
	async update(id: number, dto: UpdateAdminDto) {
		let { data: findAdmin } = await this.findOneById(id);
		if (dto.password) {
			const hashedPassword = await BcryptEncryption.encrypt(dto.password);
			dto.password = hashedPassword;
		}

		await this.getRepository.update(id, dto);

		return { data: {}, status: 200, message: "admin details updated" };
	}
	private checkPhoneNumber(phone: string): boolean {
		if (!Number(phone)) {
			return false;
		}
		if (phone.length !== 13) {
			return false;
		}
		if (phone.slice(0, 4) !== "+998") {
			return false;
		}
		if (!Number(phone.slice(4, phone.length))) {
			return false;
		}
		return true;
	}
}
