import express from 'express';
import { applyCoupon, redeemCoupon } from '../controllers/couponController';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

router.post('/apply', asyncHandler(applyCoupon));
router.post('/redeem', asyncHandler(redeemCoupon));

export default router;
