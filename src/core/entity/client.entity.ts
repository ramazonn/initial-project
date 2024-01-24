import { BaseEntity } from "src/common/database/BaseEntity";
import { Column, Entity, OneToMany } from "typeorm";
import { ClientBalanceOperationEntity } from "./client-balance-operation.entity";
import { ProductSalesContractEntity } from "./product-sales-contract.entity";

@Entity("clients")
export class ClientEntity extends BaseEntity {
	@Column({ name: "name", type: "varchar" })
	name!: string;

	@Column({ name: "phone_number", type: "varchar", unique: true })
	phoneNumber!: string;

	@Column({ name: "company_name", type: "varchar" })
	companyName!: string;

	@Column({ name: "address", type: "varchar" })
	address!: string;

	@Column({ name: "balance", type: "decimal", precision: 12, scale: 2, default: 0 })
	balance!: number;

	@OneToMany(() => ProductSalesContractEntity, (contract) => contract.client)
	contracts!: ProductSalesContractEntity[];

	@OneToMany(() => ClientBalanceOperationEntity, (balanceOperation) => balanceOperation.client)
	balanceOperation!: ClientBalanceOperationEntity[];
}
