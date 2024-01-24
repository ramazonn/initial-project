import { BaseError } from "./BaseError";

/**
 * Options for DatabaseError error.
 */
type DatabaseErrorOptions<ID> = {
	/** id of the operand entity */
	id: ID;
};

/**
 * Generic error for database operations.
 */
export class DatabaseError<ID> extends BaseError {
	private id: ID | undefined;

	constructor(message: string, options?: DatabaseErrorOptions<ID>) {
		super(message);
		this.id = options?.id;
	}

	/**
	 * For formatting for debug purposes.
	 *
	 * @param indent - Indent space amount
	 *
	 * @throws TypeError
	 *
	 * @return Formatted JSON string
	 */
	public toDebugString(indent?: number): string {
		return JSON.stringify(this, null, indent);
	}
}
