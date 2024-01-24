import { PartialType } from '@nestjs/swagger';
import { CreateProductSalesDto } from './create-product-sales.dto';

export class UpdateProductSalesDto extends PartialType(CreateProductSalesDto) {}
