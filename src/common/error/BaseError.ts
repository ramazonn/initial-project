/**
 * BaseError for deriving and constructing other errors easily.
 */
export class BaseError extends Error {
	/**
	 * @param message - Error message
	 */
	constructor(message?: string) {
		super(message);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}
