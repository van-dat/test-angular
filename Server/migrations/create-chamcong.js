'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Chamcongs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MNV_code: {
        type: Sequelize.STRING
      },
      Status: {
        type: Sequelize.STRING,
        defaultValue : 1
      },
      Time_in: {
        type: Sequelize.TIME
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
    await queryInterface.dropTable('Chamcongs');
  }
};