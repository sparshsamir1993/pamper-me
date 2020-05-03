"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("RestaurantMenuSections", {
      ID: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      sectionName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      restaurantID: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("RestaurantMenuSections");
  },
};
