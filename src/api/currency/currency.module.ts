import { Module } from "@nestjs/common";
import { CurrencyService } from "./currency.service";
import { CurrencyController } from "./currency.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CurrencyEntity } from "src/core/entity/currency.entity";

@Module({
	imports: [TypeOrmModule.forFeature([CurrencyEntity])],
	controllers: [CurrencyController],
	providers: [{ provide: "ICurrencyService", useClass: CurrencyService }],
})
export class CurrencyModule {}
