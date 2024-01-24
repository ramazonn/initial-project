import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CurrencyEntity } from "src/core/entity/currency.entity";
import { CurrencyRepository } from "src/core/repository/currency.repository";
import { BaseService } from "src/infrastructure/lib/baseService";
import { ICurrencyService } from "./currency.interface";
import { CreateCurrencyDto } from "./dto/create-currency.dto";
import { UpdateCurrencyDto } from "./dto/update-currency.dto";

@Injectable()
export class CurrencyService
	extends BaseService<CreateCurrencyDto, UpdateCurrencyDto, CurrencyEntity>
	implements ICurrencyService
{
	constructor(@InjectRepository(CurrencyEntity) repository: CurrencyRepository) {
		super(repository, "Currency");
	}
	async update(id: number, dto: UpdateCurrencyDto) {
		await this.findOneById(id);
		await this.getRepository.update(id, dto);
		return { data: {}, status: 200, message: "Currency updated" };
	}
}
