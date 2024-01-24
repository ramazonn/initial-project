import { HttpException, Logger } from "@nestjs/common";
import { isArray } from "class-validator";
import { BaseEntity } from "src/common/database/BaseEntity";
import { DeleteResult, Repository } from "typeorm";
import {
	IFindOptions,
	IResponse,
	IResponsePagination,
} from "./interface";
import { ID } from "../../../common/type/index";
import { RepositoryPager } from "../pagination";

export class BaseService<CreateDto, UpdateDto, Entity> {
	constructor(
		private readonly repository: Repository<any>,
		private readonly entityName: string,
	) {}

	get getRepository() {
		return this.repository;
	}

	async create(dto: CreateDto): Promise<IResponse<Entity>> {
		let createdData = this.repository.create({
			...dto,
		}) as unknown as Entity;
		createdData = await this.repository.save(createdData);

		return {
			data: createdData,
			status: 201,
			message: `${this.entityName} created`,
		};
	}

	async findAll(options?: IFindOptions<Entity>): Promise<IResponse<Entity[]>> {
		const data = (await this.repository.find({
			...options,
		})) as Entity[];

		return { data: data, status: 200, message: "ok" };
	}

	async findAllWithPagination(
		options?: IFindOptions<Entity>,
	): Promise<IResponsePagination<Entity>> {
		return await RepositoryPager.findAll(this.getRepository, options);
	}

	async findOneBy(options: IFindOptions<Entity>): Promise<IResponse<Entity>> {
		const data = (await this.repository.findOne({
			select: options.select || {},
			relations: options.relations || [],
			where: options.where,
		})) as Entity;

		return { data: data, status: 200, message: "ok" };
	}

	async findOneById(id: ID, options?: IFindOptions<Entity>): Promise<IResponse<Entity>> {
		const data = (await this.repository.findOne({
			select: options?.select || {},
			relations: options?.relations || [],
			where: { id, ...options?.where, isDeleted: false },
		})) as unknown as Entity;

		if (!data) {
			const errorData = {
				message: `${this.entityName} Not found`,
				status: 404,
			};

			Logger.error({
				message: errorData.message,
				status: errorData.status,
				user: "none",
				stack: errorData,
				context: `${BaseService.name}  function findOneById `,
			});

			throw new HttpException(errorData.message, errorData.status);
		}

		return { data, status: 200, message: "ok" };
	}

	// async update(id: number, dto: UpdateDto) {
	// 	// let { data: foundData } = await this.findOneById(id);
	// 	const UpdateObject={...dto}
	// 	await this.repository.update(id, {...dto});

	// 	return { data: {}, status: 200, message: "admin details updated" };
	// }

	async disactive(id: ID): Promise<IResponse<Entity>> {
		const data = (await this.repository.update(
			{ id },
			{ isActive: false },
		)) as unknown as Entity;

		return { data, status: 200, message: `${this.entityName} disactived` };
	}

	async delete(id: ID): Promise<IResponse<Entity>> {
		const data = (await this.repository.update(
			{ id },
			{
				isDeleted: true,
				deletedAt: new Date(),
			},
		)) as unknown as Entity;

		return { data, status: 200, message: `${this.entityName} deleted` };
	}

	async deepDelete(ids: ID[]): Promise<IResponse<DeleteResult>> {
		const data = await this.repository.delete(ids);

		return { data, status: 200, message: `${this.entityName} deep deleted` };
	}
}
