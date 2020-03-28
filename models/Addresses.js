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
  address1: Sequelize.STRING,
  address2: Sequelize.STRING,
  city: Sequelize.STRING,
  country: Sequelize.STRING,
  postal_code: Sequelize.STRING
});
