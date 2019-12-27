'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Restaurants", {
      ID: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
      },
      name: Sequelize.STRING(200),
      phone: Sequelize.STRING(13),
      address: Sequelize.STRING,
      lat: Sequelize.STRING,
      lng: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Restaurants");
  }
};
