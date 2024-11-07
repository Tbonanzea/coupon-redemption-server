import Coupon from '../models/Coupon';
import User from '../models/User';
import { generateCouponCode } from '../utils/genarateCouponCode';
const { Op } = require('sequelize');

const generateCoupon = async (userId: string | undefined): Promise<Coupon> => {
	const coupon = new Coupon();
	coupon.code = generateCouponCode();
	const possibleDiscounts = [5, 10, 15, 20, 25];
	coupon.discount =
		possibleDiscounts[Math.floor(Math.random() * possibleDiscounts.length)]; // Random discount

	if (userId) {
		const user = await User.findByPk(parseInt(userId));
		if (!user) {
			throw new Error('User not found');
		}
		coupon.userId = parseInt(userId);
	}

	await coupon.save();
	return coupon;
};

const assignCoupon = async (userId: number) => {
	const user = await User.findByPk(userId);
	if (!user) {
		throw new Error('User not found');
	}

	// Assign random coupon that has not been assigned or redeemed yet
	const coupon = await Coupon.findOne({
		where: {
			userId: { [Op.is]: null },
			isRedeemed: false,
		},
	});

	if (!coupon) {
		throw new Error('No coupons available');
	}
	coupon.userId = userId;
	await coupon.save();

	return coupon.code;
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
	coupon.userId = null;

	await coupon.save();
};

export default { applyCoupon, redeemCoupon, generateCoupon, assignCoupon };
