"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Orders",
      "addressID",
      Sequelize.INTEGER(11)
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Orders", "addressID");
  },
};
