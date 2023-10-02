'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chamcong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Chamcong.belongsTo(models.User, { foreignKey : 'MNV_code', targetKey: 'id', as :'Nhanvien'})
    }
  }
  Chamcong.init({
    MNV_code: DataTypes.STRING,
    Status : DataTypes.STRING,
    Time_in : DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Chamcong',
  });
  return Chamcong;
};