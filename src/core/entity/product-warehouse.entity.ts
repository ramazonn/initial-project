import { Max, Min } from "class-validator";
import { BaseEntity } from "src/common/database/BaseEntity";
import { Column, Entity, JoinColumn, ManyToOne, NumericType, OneToMany } from "typeorm";
import { ManufacturerEntity } from "./manufacturer.entity";
import { ProductEntity } from "./product.entity";

@Entity("products_warehouse")
export class ProductWarehouseEntity extends BaseEntity {
	@Column({ name: "name", type: "varchar", unique: true })
	name!: string;

	@Column({ name: "description", type: "varchar" })
	description!: string;

	@Column({ name: "origin_price", type: "decimal", precision: 8, scale: 2 })
	originPrice!: number;

	@Column({ name: "selling_price", type: "decimal", precision: 8, scale: 2 })
	sellingPrice!: number;

	@Column({ name: "percentage", type: "int" })
	@Min(1)
	@Max(100)
	percentage!: number;

	@ManyToOne(() => ManufacturerEntity, (manufacturer) => manufacturer.products, {
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "manufacturer_id" })
	manufacturer!: ManufacturerEntity;

	@OneToMany(() => ProductEntity, (product) => product.productWarehouse)
	relatedProducts!: ProductEntity[];
}
