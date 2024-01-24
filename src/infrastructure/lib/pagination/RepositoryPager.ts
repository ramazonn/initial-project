import { FindManyOptions, ObjectLiteral, Repository } from "typeorm";

import { Pager } from "./Pager";
import { findAllCustomQueryOptions, Page } from "./Page";
import { IFindOptions, IResponsePagination } from "src/infrastructure/lib/baseService/interface";

export class RepositoryPager {
	public static readonly DEFAULT_PAGE = 1;
	public static readonly DEFAULT_PAGE_SIZE = 10;

	public static async findAll<T extends ObjectLiteral>(
		repo: Repository<T>,
		options?: IFindOptions<T>,
	): Promise<IResponsePagination<T>> {
		const [data, count] = await repo.findAndCount(RepositoryPager.normalizePagination(options));
		return Pager.of(
			data,
			count,
			options?.take ?? this.DEFAULT_PAGE_SIZE,
			options?.skip ?? this.DEFAULT_PAGE,
			200,
			"ok",
		);
	}

	private static normalizePagination<T>(options?: IFindOptions<T>): FindManyOptions<T> {
		let page = (options?.skip ?? RepositoryPager.DEFAULT_PAGE) - 1; // pagination is 1 indexed, convert into 0 indexed
		return {
			...options,
			take: options?.take,
			skip: page * (options?.take ?? RepositoryPager.DEFAULT_PAGE_SIZE),
		};
	}
	// :TODO replace findCustomQueryP --> findCustomQuery
	// public static findAllCustomQuery<T extends ObjectLiteral>(
	// 	data: T[],
	// 	options?: FindManyOptions<any>,
	// ): Page<T> {
	// 	const count = data.length;
	// 	const takeData = this.normalizeCustomQueryPagination(
	// 		data,
	// 		options?.take ?? RepositoryPager.DEFAULT_PAGE_SIZE,
	// 		options?.skip ?? RepositoryPager.DEFAULT_PAGE,
	// 	);

	// 	return Pager.of(takeData, count, options?.take ?? RepositoryPager.DEFAULT_PAGE_SIZE);
	// }

	// public static async findAllCustomQueryP<T extends ObjectLiteral>(
	// 	repo: Repository<T>,
	// 	options: findAllCustomQueryOptions,
	// ): Promise<Page<T>> {
	// 	const data = (await repo.query(options.data.query, options.data.parameters)) as Array<T>;
	// 	const [{ count }] = (await repo.query(options.count.query, options.count.parameters)) as {
	// 		count: number;
	// 	}[];

	// 	return Pager.of(data, count, options.take ?? RepositoryPager.DEFAULT_PAGE_SIZE);
	// }

	// private static normalizeCustomQueryPagination<T>(
	// 	data: Array<T>,
	// 	take: number,
	// 	skip: number,
	// ): Array<T> {
	// 	const takeData: Array<T> = [],
	// 		fromIndex = (skip - 1) * take,
	// 		toIndex = data.length < fromIndex + take ? data.length : fromIndex + take;

	// 	for (let i = fromIndex; i < toIndex; i++) {
	// 		takeData.push(data[i]);
	// 	}

	// 	return takeData;
	// }
}
