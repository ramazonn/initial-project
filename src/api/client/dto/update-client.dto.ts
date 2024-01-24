import { PartialType } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";
import { CreateClientDto } from "./create-client.dto";

export class UpdateClientDto extends PartialType(CreateClientDto) {}
