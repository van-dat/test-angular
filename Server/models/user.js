const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, { foreignKey : 'Role_code', targetKey: 'Code', as :'Chucvu'})
    }
  }
  User.init({
    Name: DataTypes.STRING,
    MNV: DataTypes.STRING,
    Ngay_sinh: DataTypes.DATE,
    Dia_chi: DataTypes.STRING,
    Gioi_tinh: DataTypes.STRING,
    Password: DataTypes.STRING,
    Role_code : DataTypes.STRING

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};