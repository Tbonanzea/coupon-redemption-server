import { Request, Response, NextFunction } from 'express';
import couponService from '../services/couponService';

export const applyCoupon = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {
	const { userId, code } = req.body;
	try {
		const discount = await couponService.applyCoupon(userId, code);
		return res.status(200).json({ discount });
	} catch (error) {
		if (error instanceof Error) {
			next({ error: error.message });
		}
		next({ error: 'An unknown error occurred' });
	}
};

export const redeemCoupon = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {
	const { userId, code } = req.body;
	try {
		await couponService.redeemCoupon(userId, code);
		return res
			.status(200)
			.json({ message: 'Coupon redeemed successfully' });
	} catch (error) {
		if (error instanceof Error) {
			next({ error: error.message });
		}
		next({ error: 'An unknown error occurred' });
	}
};
