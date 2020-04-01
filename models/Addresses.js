"use strict";
const Sequelize = require("sequelize");

module.exports = sequelize.define("Addresses", {
  ID: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: Sequelize.STRING,
  buildingNumber: Sequelize.STRING,
  street: Sequelize.STRING,
  city: Sequelize.STRING,
  country: Sequelize.STRING,
  postal_code: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  directions: Sequelize.STRING,
  detailedAddress: Sequelize.STRING
});
