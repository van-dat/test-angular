'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Detail.init({
    Day: DataTypes.STRING,
    Hour: DataTypes.STRING,
    Shift: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Detail',
  });
  return Detail;
};