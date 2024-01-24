import { Module } from "@nestjs/common";
import { ClientService } from "./client.service";
import { ClientController } from "./client.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientEntity } from "src/core/entity/client.entity";

@Module({
	imports: [TypeOrmModule.forFeature([ClientEntity])],
	controllers: [ClientController],
	providers: [{ provide: "IClientService", useClass: ClientService }],
})
export class ClientModule {}
