import { Request, Response, NextFunction } from 'express';
import couponService from '../services/couponService';

export const generateCoupon = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {
	try {
		const userId = req.query.userId || req.body.userId;
		if (!userId) {
			return res
				.status(400)
				.json({ error: 'User ID is required to generate a coupon' });
		}

		const coupon = await couponService.generateCoupon(userId);
        
		return res.status(200).json({ coupon });
	} catch (error) {
		if (error instanceof Error) {
			next({ error: error.message });
		} else {
			next({ error: 'An unknown error occurred' });
		}
	}
};

export const getCouponByUser = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {
	const { userId } = req.body;
	try {
		const coupon = await couponService.getCouponByUser(userId);
		return res.status(200).json({ coupon });
	} catch (error) {
		if (error instanceof Error) {
			next({ error: error.message });
		}
		next({ error: 'An unknown error occurred' });
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
