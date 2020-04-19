"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Payments", {
      ID: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      stripeToken: {
        type: Sequelize.STRING,
      },
      paymentType: {
        type: Sequelize.STRING,
      },
      paymentSuccessful: {
        type: Sequelize.BOOLEAN,
        defaulValue: false,
      },
      orderID: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Payments");
  },
};
