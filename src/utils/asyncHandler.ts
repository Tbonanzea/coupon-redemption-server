// utils/asyncHandler.ts
import { Request, Response, NextFunction } from 'express';

export const asyncHandler = (
	fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
	return (req: Request, res: Response, next: NextFunction) => {
		fn(req, res, next).catch(next); // Catch any errors and pass to next
	};
};
