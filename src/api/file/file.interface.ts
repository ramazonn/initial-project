import { IFindOptions, IResponse } from "src/infrastructure/lib/baseService/interface";
import { ID } from "src/common/type";
import { FileEntity } from "src/core/entity/file.entity";
import { Repository } from "typeorm";
import { CreateFileDto } from "./dto/create-file.dto";

export interface IFileService {
	get getRepository(): Repository<any>;

	findAll(option?: IFindOptions<FileEntity>): Promise<IResponse<FileEntity[]>>;

	findOneById(id: ID, option?: IFindOptions<FileEntity>): Promise<IResponse<FileEntity>>;

  create(dto: CreateFileDto): Promise<IResponse<FileEntity>>;
  
	delete(id: number): Promise<IResponse<FileEntity>>;
}
