"use strict";
const Sequelize = require("sequelize");

module.exports = sequelize.define("RestaurantMenuSections", {
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
