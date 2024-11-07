import Coupon from '../models/Coupon';
import User from '../models/User';
import { generateCouponCode } from '../utils/genarateCouponCode';

const generateCoupon = async (userId: string): Promise<Coupon> => {
	const coupon = new Coupon();
	coupon.code = generateCouponCode();
	const possibleDiscounts = [5, 10, 15, 20, 25];
	coupon.discount =
		possibleDiscounts[Math.floor(Math.random() * possibleDiscounts.length)]; // Random discount
	coupon.userId = parseInt(userId);
	await coupon.save();
	return coupon;
};

const getCouponByUser = async (userId: number): Promise<Coupon | null> => {
	const user = await User.findByPk(userId);
	if (!user) {
		throw new Error('User not found');
	}

	const coupon = await Coupon.findOne({ where: { userId } });
	return coupon;
};

const applyCoupon = async (userId: number, code: string): Promise<number> => {
	const coupon = await Coupon.findOne({ where: { code, isRedeemed: false } });
	if (!coupon) {
		throw new Error('Invalid or redeemed coupon');
	}

	const user = await User.findByPk(userId);
	if (!user) {
		throw new Error('User not found');
	}

	return coupon.discount;
};

const redeemCoupon = async (userId: number, code: string) => {
	const coupon = await Coupon.findOne({ where: { code, isRedeemed: false } });
	if (!coupon) {
		throw new Error('Invalid or redeemed coupon');
	}

	const user = await User.findByPk(userId);
	if (!user) {
		throw new Error('User not found');
	}

	coupon.isRedeemed = true;
	await coupon.save();
};

export default { applyCoupon, redeemCoupon, generateCoupon, getCouponByUser };
