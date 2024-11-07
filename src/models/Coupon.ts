import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

interface CouponAttributes {
	id: number;
	code: string;
	discount: number;
	isRedeemed: boolean;
	userId: number; // Define userId here
}

// Optional fields for creation (if any are optional)
interface CouponCreationAttributes extends Optional<CouponAttributes, 'id'> {}

class Coupon
	extends Model<CouponAttributes, CouponCreationAttributes>
	implements CouponAttributes
{
	public id!: number;
	public code!: string;
	public discount!: number;
	public isRedeemed!: boolean;
	public userId!: number;

	// Timestamps
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Coupon.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
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
		userId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'users',
				key: 'id',
			},
		},
	},
	{
		sequelize,
		tableName: 'coupons',
		modelName: 'Coupon',
	}
);

export default Coupon;
