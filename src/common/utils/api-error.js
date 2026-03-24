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
}

export default ApiError;
