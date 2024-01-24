import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Roles } from "src/common/database/Enums";

export class CreateAdminDto {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	fullName!: string;

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	username!: string;

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	password!: string;

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	phoneNumber!: string;
}

export class CreateAdminDtoWithRole extends CreateAdminDto {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsEnum(Roles)
	role!: Roles;
}
