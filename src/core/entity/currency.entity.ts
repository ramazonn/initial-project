import { BaseEntity } from "src/common/database/BaseEntity";
import { Column, Entity } from "typeorm";

@Entity('currency')
export class CurrencyEntity extends BaseEntity {
	@Column({ name: "name", type: "varchar" })
	name!: string;

	@Column({ name: "symbol", type: "varchar" })
	symbol!: string;

	@Column({ name: "", type: "decimal", precision: 12, scale: 2 })
	amount!: number;
}
