'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Items",{
      ID: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
      },
      name: {
          type:Sequelize.STRING(200),
          allowNull: false
      },
      price: {
          type: Sequelize.DECIMAL(10,2),
          allowNull: false,
      },
      restaurantID: {
          type: Sequelize.INTEGER(11)
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Items");
  }
};
