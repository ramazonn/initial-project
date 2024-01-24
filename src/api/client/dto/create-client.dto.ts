import { IsNotEmpty, IsString } from "class-validator";
import { IsPhoneNumber } from "src/common/decorator/is-phone-number";
export class CreateClientDto {
	@IsNotEmpty()
	@IsString()
	name!: string;

	@IsNotEmpty()
	@IsString()
	@IsPhoneNumber()
	phoneNumber!: string;

	@IsNotEmpty()
	@IsString()
	companyName!: string;

	@IsNotEmpty()
	@IsString()
	address!: string;
}
