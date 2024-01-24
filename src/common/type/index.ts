import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Request } from "express";
import { Roles } from "../database/Enums";

export type ID = number;

export class ObjDto {
	@ApiProperty({
		type: Number,
		description: "id",
	})
	@IsNotEmpty()
	@IsInt()
	id!: ID;
}
export class ProductSalesDto extends ObjDto {
	@ApiProperty({
		type: Number,
		description: "quantity",
	})
	@IsNotEmpty()
	@IsInt()
	quantity!: number;
}

export interface RequestWithPayload extends Request {
	user: AuthPayload;
}
export interface AuthPayload {
	id: number;
	role: Roles;
}
