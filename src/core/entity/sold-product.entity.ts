import { BaseEntity } from "src/common/database/BaseEntity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ProductSalesContractEntity } from "./product-sales-contract.entity";
import { ProductEntity } from "./product.entity";

@Entity("sold_products")
export class SoldProductEntity extends BaseEntity {
	@Column({ name: "quantity", type: "int" })
	quantity!: number;

	@ManyToOne(() => ProductEntity, (product) => product.soldProducts, {
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "product_id" })
	product!: ProductEntity;

	@ManyToOne(() => ProductSalesContractEntity, (contract) => contract.soldProducts, {
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "contract_id" })
	contract!: ProductSalesContractEntity;
}
