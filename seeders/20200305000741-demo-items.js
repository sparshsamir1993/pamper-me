'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return queryInterface.bulkInsert('Items', [
        {
          name: 'Chciken on rocks',
          price: "10.99",
          restaurantID: 1
        },
        {
          name: 'Chicken Shawarma',
          price: "8.50",
          restaurantID: 1
        },
        {
          name: 'Pizza',
          price: "11",
          restaurantID: 2
        },
        {
          name: 'Hot Dog',
          price: "3.5",
          restaurantID: 2
        },
        
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
