class ApiError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
		this.isOperation = true;
		Error.captureStackTrace(this, this.constructor);
	}

	static badRequest(message = "Bad request") {
		return new ApiError(message, 400);
	}

	static unauthorized(message = "Unauthorized") {
		return new ApiError(message, 401);
	}

	static conflict(message = "Conflict - User already exists") {
		return new ApiError(message, 409);
	}

	static forbidden(message = "Forbidden") {
		return new ApiError(message, 412);
	}

	static notfound(message = "Not Found") {
		return new ApiError(message, 404);
	}
}

export default ApiError;
