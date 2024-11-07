import express from 'express';
import {
	applyCoupon,
	redeemCoupon,
	generateCoupon,
	getCouponByUser,
} from '../controllers/couponController';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

router.get('/generate-coupon', asyncHandler(generateCoupon));
router.get('/get-coupon-by-user', asyncHandler(getCouponByUser));
router.post('/apply', asyncHandler(applyCoupon));
router.post('/redeem', asyncHandler(redeemCoupon));

export default router;
