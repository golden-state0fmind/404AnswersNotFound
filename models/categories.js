'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.categories.hasMany(models.question);
    }
  };
  categories.init({
    category: DataTypes.STRING(30)
  }, {
    sequelize,
    modelName: 'categories',
  });
  return categories;
};