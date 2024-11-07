import Coupon from '../models/Coupon';
import User from '../models/User';

const applyCoupon = async (userId: number, code: string): Promise<number> => {
	const coupon = await Coupon.findOne({ where: { code, isRedeemed: false } });
	if (!coupon) {
		throw new Error('Invalid or redeemed coupon');
	}

	const user = await User.findByPk(userId);
	if (!user) {
		throw new Error('User not found');
	}

	// Apply discount logic (e.g., check user’s eligibility, limit, etc.)
	return coupon.discount;
};

const redeemCoupon = async (userId: number, code: string) => {
	const coupon = await Coupon.findOne({ where: { code, isRedeemed: false } });
	if (!coupon) {
		throw new Error('Invalid or already redeemed coupon');
	}

	coupon.isRedeemed = true;
	await coupon.save();
};

export default { applyCoupon, redeemCoupon };
