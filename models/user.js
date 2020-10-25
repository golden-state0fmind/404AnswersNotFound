'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.user.hasMany(models.questions);
      models.user.hasMany(models.answers);
    }
  };
  user.init({
    username: DataTypes.STRING(25),
    password: DataTypes.STRING(99),
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    title: DataTypes.STRING(25),
    quote: DataTypes.STRING(200),
    jobTitle: DataTypes.STRING(25),
    bio: DataTypes.STRING(500),
    profilePicture: DataTypes.STRING,
    answerId: DataTypes.ARRAY(DataTypes.INTEGER),
    questionId: DataTypes.ARRAY(DataTypes.INTEGER),
    rating: DataTypes.STRING,
    points: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};