import { Module } from "@nestjs/common";
import { ManufacturerService } from "./manufacturer.service";
import { ManufacturerController } from "./manufacturer.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ManufacturerEntity } from "src/core/entity/manufacturer.entity";
import { ManufacturerDebtEntity } from "src/core/entity/manufacturer-debt.entity";

@Module({
	imports: [TypeOrmModule.forFeature([ManufacturerEntity])],
	controllers: [ManufacturerController],
	providers: [{ provide: "IManufacturerService", useClass: ManufacturerService }],
})
export class ManufacturerModule {}
