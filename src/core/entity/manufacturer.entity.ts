import { BaseEntity } from "src/common/database/BaseEntity";
import { Column, Entity, OneToMany } from "typeorm";
import { ProductSalesContractEntity } from "./product-sales-contract.entity";
import { ManufacturerDebtEntity } from "./manufacturer-debt.entity";
import { ProductWarehouseEntity } from "./product-warehouse.entity";
import { ManufacturerBalanceEntity } from "./manufacturer-balance.entity";

@Entity("manufacturers")
export class ManufacturerEntity extends BaseEntity {
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

	@OneToMany(() => ManufacturerDebtEntity, (manufacturerDebt) => manufacturerDebt.manufacturer)
	debts!: ManufacturerDebtEntity[];

	@OneToMany(
		() => ProductWarehouseEntity,
		(manufacturerProducts) => manufacturerProducts.manufacturer,
	)
	products!: ProductWarehouseEntity[];

	@OneToMany(
		() => ManufacturerBalanceEntity,
		(manufacturerBalance) => manufacturerBalance.manufacturer,
	)
	manufacturerAccount!: ManufacturerBalanceEntity[];
}
