import { BaseEntity } from "src/common/database/BaseEntity";
import { ContractStatus } from "src/common/database/Enums";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { ClientBalanceOperationEntity } from "./client-balance-operation.entity";
import { ClientEntity } from "./client.entity";
import { ManufacturerEntity } from "./manufacturer.entity";
import { ProductEntity } from "./product.entity";
import { SoldProductEntity } from "./sold-product.entity";

@Entity("contracts")
export class ProductSalesContractEntity extends BaseEntity {
	@Column({ name: "index", type: "varchar", nullable: true })
	index!: string;

	@Column({ name: "discount", type: "boolean", default: false })
	discount!: boolean;

	@Column({ name: "discount_percentage", type: "int", default: 0 })
	discount_percentage!: number;

	@Column({ name: "origin_price", type: "decimal", precision: 12, scale: 2 })
	originPrice!: number;

	@Column({ name: "sold_price", type: "decimal", precision: 12, scale: 2 })
	soldPrice!: number;

	@Column({ name: "status", type: "enum", enum: ContractStatus })
	status!: string;

	@ManyToOne(() => ClientEntity, (client) => client.contracts, {
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "client_id" })
	client!: ClientEntity;

	@OneToMany(() => SoldProductEntity, (product) => product.contract)
	soldProducts!: SoldProductEntity;

	@OneToOne(() => ClientBalanceOperationEntity, (balanceOperation) => balanceOperation.contract)
	clientBalanceOperation!: ClientBalanceOperationEntity;
}
