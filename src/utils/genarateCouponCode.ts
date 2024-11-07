import { v4 as uuidv4 } from 'uuid';

export const generateCouponCode = (): string => {
	return uuidv4().replace(/-/g, '').toUpperCase();
};
