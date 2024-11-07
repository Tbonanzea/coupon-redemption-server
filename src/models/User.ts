import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import Coupon from './Coupon';

class User extends Model {
	public id!: number;
	public email!: string;
}

User.init(
	{
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	},
	{
		sequelize,
		modelName: 'User',
	}
);

// Relations
User.hasMany(Coupon, { foreignKey: 'userId' });
Coupon.belongsTo(User, { foreignKey: 'userId' });

export default User;
