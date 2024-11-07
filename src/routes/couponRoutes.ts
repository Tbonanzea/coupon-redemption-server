import express from 'express';
import {
	applyCoupon,
	redeemCoupon,
	generateCoupon,
	assignCoupon,
} from '../controllers/couponController';
import { asyncHandler } from '../utils/asyncHandler';
import { methodNotAllowed } from '../middleware/methodNotAllowed';

const router = express.Router();

router.get('/generate-coupon', asyncHandler(generateCoupon));
router.get('/assign-coupon', asyncHandler(assignCoupon));
router.post('/apply', asyncHandler(applyCoupon));
router.post('/redeem', asyncHandler(redeemCoupon));

router.all('*', methodNotAllowed);

export default router;
