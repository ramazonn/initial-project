import { BaseEntity } from "src/common/database/BaseEntity";
import { ManufacturerBalanceStatus, PaymentType } from "src/common/database/Enums";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ManufacturerEntity } from "./manufacturer.entity";

@Entity("manufacturer_balance")
export class ManufacturerBalanceEntity extends BaseEntity {
	@Column({ name: "amount", type: "decimal", precision: 12, scale: 2 })
	amount!: number;

	@Column({ name: "description", type: "varchar" })
	description!: string;

	@Column({ name: "currency", type: "decimal", precision: 12, scale: 2 })
	currency!: number;

	@Column({ name: "status", type: "enum", enum: ManufacturerBalanceStatus })
	status!: ManufacturerBalanceStatus;

	@Column({ name: "payment_type", type: "enum", enum: PaymentType })
	paymentType!: PaymentType;

	@ManyToOne(() => ManufacturerEntity, (manufacturer) => manufacturer.manufacturerAccount)
	@JoinColumn({ name: "manufacturer_id" })
	manufacturer!: ManufacturerEntity;
}
