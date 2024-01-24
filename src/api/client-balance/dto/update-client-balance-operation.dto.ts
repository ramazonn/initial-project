import { PartialType } from '@nestjs/swagger';
import { CreateClientBalanceOperationDto } from './create-client-balance-operation.dto';

export class UpdateClientBalanceOperationDto extends PartialType(CreateClientBalanceOperationDto) {}
