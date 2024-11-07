import { Request, Response, NextFunction, RequestHandler } from 'express';
import couponService from '../services/couponService';

export const generateCoupon: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const userId = req.query.userId || req.body.userId;

		if (typeof userId !== 'string' && typeof userId !== 'undefined') {
			return next({ status: 400, message: 'Invalid user ID format, has to be a string' });
		}

		const coupon = await couponService.generateCoupon(userId);

		res.status(200).json({ coupon });
	} catch (error) {
		next(error);
	}
};

export const assignCoupon: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const userId = req.query.userId || req.body.userId;
	const code = req.query.code || req.body.code;
	if (!userId || !code) {
		next({ status: 400, message: 'User ID and code are required' });
	}

	try {
		await couponService.assignCoupon(userId, code);
		res.status(200).json({ message: 'Coupon assigned successfully' });
	} catch (error) {
		next(error);
	}
};

export const applyCoupon: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const { userId, code } = req.body;
	if (!userId || !code) {
		next({ status: 400, message: 'User ID and code are required' });
	}

	try {
		const discount = await couponService.applyCoupon(userId, code);
		res.status(200).json({ discount });
	} catch (error) {
		next(error);
	}
};

export const redeemCoupon: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const { userId, code } = req.body;
	try {
		await couponService.redeemCoupon(userId, code);
		res.status(200).json({ message: 'Coupon redeemed successfully' });
	} catch (error) {
		next(error);
	}
};
