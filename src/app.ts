import express from 'express';
import bodyParser from 'body-parser';
import couponRoutes from './routes/couponRoutes';

const app = express();
app.use(bodyParser.json());

app.use('/api/coupons', couponRoutes);

export default app;
