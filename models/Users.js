const Sequelize = require("sequelize");

module.exports = sequelize.define("Users", {
  ID: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING(200),
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING(100),
  },
  googleID: {
    type: Sequelize.STRING(100),
  },
  is_admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  currentAddress: {
    type: Sequelize.INTEGER(11),
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
