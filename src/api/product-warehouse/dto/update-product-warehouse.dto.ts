import { PartialType } from '@nestjs/swagger';
import { CreateProductWarehouseDto } from './create-product-warehouse.dto';

export class UpdateProductWarehouseDto extends PartialType(CreateProductWarehouseDto) {}
