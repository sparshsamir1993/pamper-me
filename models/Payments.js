"use strict";
const Sequelize = require("sequelize");

module.exports = sequelize.define("Payments", {
  ID: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: Sequelize.DECIMAL(10, 2),
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
    defaultValue: false,
  },
  orderID: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
