'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Orders",{
      ID: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      grand_total: Sequelize.DECIMAL(10,2),
      is_confirmed:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      userID: {
        type: Sequelize.INTEGER(11)
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Orders");
  }
};
