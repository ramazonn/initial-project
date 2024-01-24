import { Type } from "class-transformer";
import {
	ArrayMinSize,
	IsArray,
	IsBoolean,
	IsNotEmpty,
	IsNumber,
	Max,
	Min,
	ValidateNested,
} from "class-validator";
import { ObjDto, ProductSalesDto } from "src/common/type";

export class CreateProductSalesDto {
	@IsNotEmpty()
	@IsNumber()
	originPrice!: number;

	@IsNotEmpty()
	@IsNumber()
	soldPrice!: number;

	@IsNotEmpty()
	@IsArray()
	@ArrayMinSize(1, { message: "at least one element required" })
	@Type(() => ProductSalesDto)
	@ValidateNested({ each: true })
	products!: ProductSalesDto[];

	@IsNotEmpty()
	@IsBoolean()
	discount: boolean = false;

	@IsNotEmpty()
	@IsNumber()
	@Min(0)
	@Max(100)
	discount_percentage: number = 0;

	@IsNotEmpty()
	@Type(() => ObjDto)
	@ValidateNested({ each: true })
	client!: ObjDto;
}
