'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class question extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.question.belongsTo(models.user, {
				foreignKey: 'createdBy',
				target: 'username',
			});
			models.question.hasMany(models.answer);
		}
	}
	question.init(
		{
			category: {
				type: DataTypes.STRING,
			},
			createdBy: {
				type: DataTypes.STRING,
			},
			lastModifiedBy: {
				type: DataTypes.STRING,
			},
			lastModifiedDate: {
				type: DataTypes.DATE,
			},
			summary: {
				type: DataTypes.STRING,
				validate: {
					len: {
						args: [100 - 255],
						msg: 'Must be between 100 to 255 characters',
					},
					min: {
						args: 100,
						// eslint-disable-next-line prettier/prettier
						msg: 'Must be at least 100 characters long to ensure quality control.',
					},
					max: {
						args: 255,
						msg: 'Must be 255 characters or less.',
					},
				},
			},
			content: {
				type: DataTypes.TEXT,
			},
			upVotes: DataTypes.INTEGER,
			downVotes: DataTypes.STRING,
			answerIds: DataTypes.ARRAY(DataTypes.INTEGER),
		},
		{
			sequelize,
			modelName: 'question',
		}
	);
	return question;
};
