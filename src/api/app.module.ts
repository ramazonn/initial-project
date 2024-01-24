import { TypeOrmModule } from "@nestjs/typeorm";

import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ScheduleModule as NestScheduleModule } from "@nestjs/schedule";

import { CorrelatorMiddleware } from "../infrastructure/middleware/correlator";
import { config } from "src/config";
import { AdminModule } from "./admin/admin.module";
import { FileModule } from "./file/file.module";
import { AuthModule } from "./auth/AuthModule";
import { ManufacturerModule } from "./manufacturer/manufacturer.module";
import { ClientModule } from "./client/client.module";
import { ProductModule } from "./product/product.module";
import { ProductWarehouseModule } from "./product-warehouse/product-warehouse.module";
import { ProductSalesModule } from "./product-sales/product-sales.module";
import { ClientBalanceOperationModule } from "./client-balance/client-balance-operation.module";
import { ManufacturerBalanceModule } from "./manufacturer-balance/manufacturer-balance.module";
import { CurrencyModule } from './currency/currency.module';

@Module({
	imports: [
		AuthModule,
		TypeOrmModule.forRoot({
			type: "postgres",
			url: config.DB_URL,
			entities: ["dist/core/entity/*.entity{.ts,.js}"],
			synchronize: true,
		}),
		NestScheduleModule.forRoot(),
		AdminModule,
		FileModule,
		ManufacturerModule,
		ClientModule,
		ProductModule,
		ProductWarehouseModule,
		ProductSalesModule,
		ClientBalanceOperationModule,
		ManufacturerBalanceModule,
		CurrencyModule,
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(CorrelatorMiddleware).forRoutes("*");
	}
}
