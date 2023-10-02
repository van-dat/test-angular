const { sequelize } = require('../models');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      Name: {
        type: Sequelize.STRING
      },
      MNV: {
        type: Sequelize.STRING,
        unique: true
      },
      Password: {
        type: Sequelize.STRING
      },
      Role_code: {
        type: Sequelize.STRING,
        defaultValue: 'NV'
      },
      Gioi_tinh: {
        type: Sequelize.STRING,

      },
      Dia_chi: {
        type: Sequelize.STRING,
      },
      Ngay_sinh: {
        type: Sequelize.DATEONLY,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};