import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	Column,
} from "typeorm";

@Entity()
export class BaseEntity {
	@PrimaryGeneratedColumn({ type: "int" })
	id!: number;

	@Column({
		name: "is_active",
		type: "boolean",
		nullable: false,
		default: true,
	})
	isActive!: boolean;

	@Column({
		name: "is_deleted",
		type: "boolean",
		nullable: false,
		default: false,
	})
	isDeleted!: boolean;

	@CreateDateColumn({ name: "created_at" })
	createdAt!: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt!: Date;

	@DeleteDateColumn({ name: "deleted_at" })
	deletedAt!: Date;
}
