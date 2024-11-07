import { Request, Response } from 'express';

// Custom error handler middleware
export const errorHandler = (err: any, req: Request, res: Response) => {
	const statusCode = err.status || 500; // Default to 500 if status is not defined
	const message = err.message || 'Internal Server Error';

	res.status(statusCode).json({
		success: false,
		error: {
			message,
			// Include the stack trace in development
			...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
		},
	});
};
