import express from 'express';
import {
	applyCoupon,
	redeemCoupon,
	generateCoupon,
	assignCoupon,
} from '../controllers/couponController';
import { methodNotAllowed } from '../middleware/methodNotAllowed';

const router = express.Router();

router.get('/generate-coupon', generateCoupon);
router.post('/assign-coupon', assignCoupon);
router.post('/apply', applyCoupon);
router.post('/redeem', redeemCoupon);

router.all('*', methodNotAllowed);

export default router;
