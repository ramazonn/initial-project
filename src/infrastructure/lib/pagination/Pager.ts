import { IResponsePagination } from "src/infrastructure/lib/baseService/interface";
import { Page } from "./Page";

export class Pager<T> {
	public static of<T>(
		data: Array<T>,
		totalElements: number,
		pageSize: number,
		currentPage: number,
		status: number,
		message: string,
	): IResponsePagination<T> {
		return new Pager(
			data,
			totalElements,
			Math.ceil(totalElements / pageSize),
			pageSize,
			currentPage,
			status,
			message,
		).toPage();
	}

	private constructor(
		private data: Array<T>,
		private totalElements: number,
		private totalPages: number,
		private pageSize: number,
		private currentPage: number,
		private status: number,
		private message: string,
	) {}

	public toPage(): IResponsePagination<T> {
		return {
			data: this.data,
			total_elements: this.totalElements,
			total_pages: this.totalPages,
			page_size: this.pageSize,
			current_page: this.currentPage,
			status: this.status,
			message: this.message,
		};
	}
}
