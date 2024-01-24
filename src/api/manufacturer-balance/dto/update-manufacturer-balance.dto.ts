import { PartialType } from '@nestjs/swagger';
import { CreateManufacturerBalanceDto } from './create-manufacturer-balance.dto';

export class UpdateManufacturerBalanceDto extends PartialType(CreateManufacturerBalanceDto) {}
