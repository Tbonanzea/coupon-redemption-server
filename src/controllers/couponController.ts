import { Request, Response, NextFunction } from 'express';
import couponService from '../services/couponService';

export const generateCoupon = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {
	try {
		const userId = req.query.userId || req.body.userId;

		const coupon = await couponService.generateCoupon(userId);

		return res.status(200).json({ coupon });
	} catch (error) {
		if (error instanceof Error) {
			next({ message: error.message });
		} else {
			next({ message: 'An unknown error occurred' });
		}
	}
};

export const assignCoupon = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {
	const userId = req.query.userId || req.body.userId;
	const code = req.query.code || req.body.code;
	try {
		await couponService.assignCoupon(userId, code);
		return res
			.status(200)
			.json({ message: 'Coupon assigned successfully' });
	} catch (error) {
		if (error instanceof Error) {
			next({ message: error.message });
		} else {
			next({ message: 'An unknown error occurred' });
		}
	}
};

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
			next({ message: error.message });
		} else {
			next({ message: 'An unknown error occurred' });
		}
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
			next({ message: error.message });
		} else {
			next({ message: 'An unknown error occurred' });
		}
	}
};
