const Sequelize = require("sequelize");

module.exports = sequelize.define("Orders", {
  ID: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  grand_total: Sequelize.DECIMAL(10, 2),
  is_confirmed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  addressID: {
    type: Sequelize.INTEGER(11),
  },
  userID: {
    type: Sequelize.INTEGER(11),
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
