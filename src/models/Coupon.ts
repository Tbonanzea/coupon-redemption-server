import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Coupon extends Model {
	public id!: number;
	public code!: string;
	public discount!: number;
	public isRedeemed!: boolean;
}

Coupon.init(
	{
		code: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		discount: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		isRedeemed: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		sequelize,
		modelName: 'Coupon',
	}
);

export default Coupon;
