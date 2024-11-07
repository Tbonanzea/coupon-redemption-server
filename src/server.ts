import app from './app';
import sequelize from './config/db';

const PORT = process.env.PORT || 3000;

sequelize
	.sync()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	})
	.catch((error) => {
		console.error('Unable to connect to the database:', error);
	});
