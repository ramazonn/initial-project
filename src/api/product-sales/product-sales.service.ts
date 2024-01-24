import { HttpException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ContractStatus } from "src/common/database/Enums";
import { ProductSalesContractEntity } from "src/core/entity/product-sales-contract.entity";
import { ProductEntity } from "src/core/entity/product.entity";
import { SoldProductEntity } from "src/core/entity/sold-product.entity";
import { ProductSalesContractRepository } from "src/core/repository/product-sales-contract.repository";
import { SoldProductRepository } from "src/core/repository/sold-product.repository";
import { BaseService } from "src/infrastructure/lib/baseService";
import { GenerateContractIndex } from "src/infrastructure/lib/generate-contract-index";
import { IClientService } from "../client/client.interface";
import { IManufacturerService } from "../manufacturer/manufacturer.interface";
import { ProductNotFound } from "../product/exception/ProductNotFound";
import { IProductService } from "../product/product.interface";
import { CreateProductSalesDto } from "./dto/create-product-sales.dto";
import { UpdateProductSalesDto } from "./dto/update-product-sales.dto";
import { ProductDoesntEnough } from "./exception/ProductDoesntEnough";
import { IProductSalesService } from "./product-sales.interface";

@Injectable()
export class ProductSalesService
	extends BaseService<CreateProductSalesDto, UpdateProductSalesDto, ProductSalesContractEntity>
	implements IProductSalesService
{
	constructor(
		@InjectRepository(ProductSalesContractEntity) repository: ProductSalesContractRepository,
		@InjectRepository(SoldProductEntity)
		private readonly soldProductRepository: SoldProductRepository,
		@Inject("IClientService") private readonly clientService: IClientService,
		@Inject("IManufacturerService") private readonly manufacturerService: IManufacturerService,
		@Inject("IProductService") private readonly productService: IProductService,
	) {
		super(repository, "Contract");
	}
	async createContract(dto: CreateProductSalesDto) {
		const { data: client } = await this.clientService.findOneById(dto.client.id);
		
		for (const e of dto.products) {
			const product = (await this.productService.getRepository.findOne({
				where: { id: e.id },
			})) as ProductEntity;
			if (!product) {
				throw new ProductNotFound();
			}
			if (e.quantity > product.quantity) {
				throw new ProductDoesntEnough();
			}
		}

		let producSalesContract = (await this.getRepository.create(
			dto,
		)) as ProductSalesContractEntity;
		if (Number(client.balance) < dto.soldPrice) {
			producSalesContract.status = ContractStatus.DEBT;
		} else {
			client.balance = Number(client.balance) - dto.soldPrice;
			await this.clientService.getRepository.save(client);
			producSalesContract.status = ContractStatus.PAID;
		}

		producSalesContract = await this.getRepository.save(producSalesContract);
		const contractIndex = GenerateContractIndex(producSalesContract.id);
		producSalesContract.index = contractIndex;
		await this.getRepository.save(producSalesContract);
    
		let soldProducts: SoldProductEntity[] = [];
		for (const e of dto.products) {
			const product = (await this.productService.getRepository.findOne({
				where: { id: e.id },
			})) as ProductEntity;

			const remain = product.quantity - e.quantity;
			await this.productService.getRepository.update(product.id, { quantity: remain });

			const soldProduct = new SoldProductEntity();
			soldProduct.quantity = e.quantity;
			soldProduct.product = product;
			soldProduct.contract = producSalesContract;
			soldProducts.push(soldProduct);
		}
		await Promise.all(
			soldProducts.map((soldProduct) => this.soldProductRepository.save(soldProduct)),
		);

		return { data: producSalesContract, status: 201, message: "Contract created" };
	}
	async update(id: number, dto: UpdateProductSalesDto) {
		await this.findOneById(id);
		await this.getRepository.update(id, dto);
		return { data: {}, status: 200, message: "Contract updated" };
	}
}
