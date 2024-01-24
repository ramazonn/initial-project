import { IsNotEmpty, IsString } from "class-validator";
import { IsPhoneNumber } from "src/common/decorator/is-phone-number";

export class CreateManufacturerDto {
	@IsNotEmpty()
	@IsString()
	name!: string;

	@IsNotEmpty()
	@IsPhoneNumber()
	phoneNumber!: string;
    
	@IsNotEmpty()
	@IsString()
	companyName!: string;

	@IsNotEmpty()
	@IsString()
	address!: string;
}
