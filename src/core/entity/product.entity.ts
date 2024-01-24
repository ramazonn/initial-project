import { BaseEntity } from "src/common/database/BaseEntity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { ProductSalesContractEntity } from "./product-sales-contract.entity";
import { ProductWarehouseEntity } from "./product-warehouse.entity";
import { SoldProductEntity } from "./sold-product.entity";

@Entity("products")
export class ProductEntity extends BaseEntity {
	@Column({ name: "origin_price", type: "decimal", precision: 8, scale: 2 })
	originPrice!: number;

	@Column({ name: "selling_price", type: "decimal", precision: 8, scale: 2 })
	sellingPrice!: number;

	@Column({ name: "percentage", type: "int", default: 0 })
	percentage!: number;

	@Column({ name: "description", type: "varchar", nullable: true })
	description!: string;

	@Column({ name: "quantity", type: "bigint" })
	quantity!: number;

	@ManyToOne(
		() => ProductWarehouseEntity,
		(productWarehouse) => productWarehouse.relatedProducts,
		{ onDelete: "CASCADE" },
	)
	@JoinColumn({ name: "product_warehouse_id" })
	productWarehouse!: ProductWarehouseEntity;

	@OneToMany(() => SoldProductEntity, (productWarehouse) => productWarehouse.product, {
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "contract_id" })
	soldProducts!: SoldProductEntity[];
}
