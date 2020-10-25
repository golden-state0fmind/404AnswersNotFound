'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class user extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.user.hasMany(models.question, {
				foreignKey: { name: 'createdBy' },
			});
			models.user.hasMany(models.answer, {
				foreignKey: { name: 'createdBy' },
			});
		}
	}
	user.init(
		{
			username: {
				type: DataTypes.STRING(25),
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING(99),
				allowNull: false,
			},
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			title: {
				type: DataTypes.STRING(25),
				allowNull: true,
			},
			quote: {
				type: DataTypes.STRING(200),
				allowNull: true,
			},
			jobTitle: {
				type: DataTypes.STRING(25),
				allowNull: true,
			},
			bio: {
				type: DataTypes.STRING(500),
				allowNull: true,
			},
			profilePicture: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			answerId: {
				type: DataTypes.ARRAY(DataTypes.INTEGER),
				allowNull: true,
			},
			questionId: {
				type: DataTypes.ARRAY(DataTypes.INTEGER),
				allowNull: true,
			},
			rating: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			points: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: 'user',
		}
	);
	return user;
};
