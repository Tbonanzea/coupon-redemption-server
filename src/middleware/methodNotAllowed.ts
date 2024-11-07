import { Request, Response } from 'express';

export const methodNotAllowed = (req: Request, res: Response) => {
	res.status(405).json({
		success: false,
		error: {
			message: `Method ${req.method} is not allowed for this endpoint.`,
		},
	});
};
