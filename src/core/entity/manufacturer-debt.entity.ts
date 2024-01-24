import { BaseEntity } from "src/common/database/BaseEntity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ManufacturerEntity } from "./manufacturer.entity";

@Entity("manufacturers_debts")
export class ManufacturerDebtEntity extends BaseEntity {
	@Column({ name: "amount", type: "decimal", precision: 12, scale: 2 })
	amount!: string;

	@ManyToOne(() => ManufacturerEntity, (manufacturer) => manufacturer.debts, {
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "manufacturer_id" })
	manufacturer!: ManufacturerEntity;
}
