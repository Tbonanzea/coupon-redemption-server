import app from './app';
import sequelize from './config/db';
import Coupon from './models/Coupon';
import User from './models/User';

const PORT = process.env.PORT || 3001;

sequelize
	.sync({ force: true, alter: true })
	.then(async () => {
		await User.sync();
		await Coupon.sync();
		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	})
	.catch((error) => {
		console.error('Unable to connect to the database:', error);
	});
