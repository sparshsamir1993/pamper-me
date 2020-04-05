"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Users",
      "currentAddress",
      Sequelize.INTEGER(11)
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Users", "currentAddress");
  },
};
