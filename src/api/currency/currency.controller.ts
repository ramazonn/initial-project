import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Inject,
	ParseIntPipe,
} from "@nestjs/common";
import { ICurrencyService } from "./currency.interface";
import { CurrencyService } from "./currency.service";
import { CreateCurrencyDto } from "./dto/create-currency.dto";
import { UpdateCurrencyDto } from "./dto/update-currency.dto";

@Controller("currency")
export class CurrencyController {
	constructor(@Inject("ICurrencyService") private readonly currencyService: ICurrencyService) {}

	@Post()
	create(@Body() createCurrencyDto: CreateCurrencyDto) {
		return this.currencyService.create(createCurrencyDto);
	}

	@Get()
	findAll() {
		return this.currencyService.findAll();
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.currencyService.findOneById(id);
	}

	@Patch(":id")
	update(@Param("id", ParseIntPipe) id: number, @Body() updateCurrencyDto: UpdateCurrencyDto) {
		return this.currencyService.update(id, updateCurrencyDto);
	}

	@Delete(":id")
	remove(@Param("id", ParseIntPipe) id: number) {
		return this.currencyService.delete(id);
	}
}
