import { Type } from "class-transformer";
import {
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	Max,
	Min,
	ValidateNested,
} from "class-validator";
import { ObjDto } from "src/common/type";

export class CreateProductDto {
	@IsNotEmpty()
	@IsNumber()
	originPrice!: number;

	@IsNotEmpty()
	@IsNumber()
	sellingPrice!: number;

	@IsNotEmpty()
	@IsNumber()
	@Min(0)
	@Max(100)
	percentage!: number;

	@IsNotEmpty()
	@IsNumber()
	quantity!: number;

	@IsOptional()
	@IsString()
	description!: number;

	@IsNotEmpty()
	@Type(() => ObjDto)
	@ValidateNested({ each: true })
	productWarehouse!: ObjDto;
}
