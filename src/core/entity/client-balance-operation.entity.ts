import { BaseEntity } from "src/common/database/BaseEntity";
import { ClientBalanceOperationStatus, PaymentType } from "src/common/database/Enums";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { ClientEntity } from "./client.entity";
import { ProductSalesContractEntity } from "./product-sales-contract.entity";

@Entity("client_balance_operations")
export class ClientBalanceOperationEntity extends BaseEntity {
	@Column({ name: "amount", type: "decimal", precision: 12, scale: 2 })
	amount!: number;

	@Column({ name: "status", type: "enum", enum: ClientBalanceOperationStatus })
	status!: ClientBalanceOperationStatus;

	@Column({ name: "payment_type", type: "enum", enum: PaymentType })
	paymentType!: PaymentType;

	@ManyToOne(() => ClientEntity, (client) => client.balanceOperation, { onDelete: "CASCADE" })
	@JoinColumn({ name: "client_id" })
	client!: ClientEntity;

	@OneToOne(() => ProductSalesContractEntity, (contract) => contract.clientBalanceOperation, {
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "contract_id" })
	contract!: ProductSalesContractEntity;
}
