import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Max, Min, ValidateNested } from "class-validator";
import { ObjDto } from "src/common/type";

export class CreateProductWarehouseDto {
	@IsNotEmpty()
	@IsString()
	name!: string;

	@IsNotEmpty()
	@IsString()
	description!: string;

	@IsNotEmpty()
	@IsNumber()
	originPrice!: number;

	@IsNotEmpty()
	@IsNumber()
	sellingPrice!: number;

	@IsNotEmpty()
	@IsNumber()
	@Min(1)
	@Max(100)
	percentage!: number;

	@IsNotEmpty()
	@Type(() => ObjDto)
	@ValidateNested({ each: true })
	manufacturer!: ObjDto;
}
