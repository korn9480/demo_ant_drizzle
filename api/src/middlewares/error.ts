export class CustomError extends Error {
    public status: number
    constructor(status: number, message?: string) {
        super(message)
        this.status = status
    }
    toResponse() {
		return Response.json({
			error: this.message,
			code: this.status
		}, {
			status: this.status
		})
	}
}

export class UnauthorizedError extends CustomError {
    constructor(message?: string) {
        super(401, message || "Unauthorized")
    }
}

export class ForbiddenError extends CustomError {
    constructor(message?: string) {
        super(403, message || "Forbidden")
    }
}

export class NotFoundError extends CustomError {
    constructor(message?: string) {
        super(404, `Not Found ${message}`)
    }
}

