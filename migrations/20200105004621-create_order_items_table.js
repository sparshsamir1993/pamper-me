'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('OrderItems', {
        ID: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        itemID: {
          type: Sequelize.INTEGER(11)
        },
        orderID: {
          type: Sequelize.INTEGER(11)
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });
    
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('OrderItems');

  }
};
