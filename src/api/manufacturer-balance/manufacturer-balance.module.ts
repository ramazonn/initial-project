import { Module } from "@nestjs/common";
import { ManufacturerBalanceService } from "./manufacturer-balance.service";
import { ManufacturerBalanceController } from "./manufacturer-balance.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ManufacturerBalanceEntity } from "src/core/entity/manufacturer-balance.entity";
import { ManufacturerService } from "../manufacturer/manufacturer.service";
import { ManufacturerEntity } from "src/core/entity/manufacturer.entity";

@Module({
	imports: [TypeOrmModule.forFeature([ManufacturerBalanceEntity, ManufacturerEntity])],
	controllers: [ManufacturerBalanceController],
	providers: [
		{ provide: "IManufacturerBalanceService", useClass: ManufacturerBalanceService },
		{ provide: "IManufacturerService", useClass: ManufacturerService },
	],
})
export class ManufacturerBalanceModule {}
