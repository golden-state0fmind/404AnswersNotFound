'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  question.init({
    categoryId: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    lastModifiedBy: DataTypes.INTEGER,
    lastModifiedDate: DataTypes.DATE,
    summary: DataTypes.STRING,
    content: DataTypes.TEXT,
    upVotes: DataTypes.INTEGER,
    downVotes: DataTypes.STRING,
    answerIds: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    sequelize,
    modelName: 'question',
  });
  return question;
};