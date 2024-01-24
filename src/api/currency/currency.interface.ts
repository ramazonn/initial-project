import { IBaseService } from "src/common/interface/IBaseService";
import { CurrencyEntity } from "src/core/entity/currency.entity";
import { CreateCurrencyDto } from "./dto/create-currency.dto";
import { UpdateCurrencyDto } from "./dto/update-currency.dto";

export interface ICurrencyService extends IBaseService<CreateCurrencyDto,UpdateCurrencyDto,CurrencyEntity>{

}