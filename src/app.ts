import express from 'express';
import bodyParser from 'body-parser';
import couponRoutes from './routes/couponRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
app.use(bodyParser.json());

app.use('/api/coupons', couponRoutes);
app.use(errorHandler);

export default app;
