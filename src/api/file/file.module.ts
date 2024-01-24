import { Module } from "@nestjs/common";
import { FileService } from "./file.service";
import { FileController } from "./file.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileEntity } from "src/core/entity/file.entity";

@Module({
	imports: [TypeOrmModule.forFeature([FileEntity])],
	controllers: [FileController],
	providers: [{ provide: "IFileService", useClass: FileService }],
})
export class FileModule {}
