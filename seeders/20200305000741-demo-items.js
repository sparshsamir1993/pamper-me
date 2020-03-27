"use strict";

import { APPETIZERS, MAIN_COURSE, SIDES, DESSERT } from "../gConstants";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkInsert(
      "Items",
      [
        {
          name: "Chciken on rocks",
          price: "10.99",
          restaurantID: 1,
          itemType: MAIN_COURSE
        },
        {
          name: "Chicken Shawarma",
          price: "8.50",
          restaurantID: 1,
          itemType: APPETIZERS
        },
        {
          name: "Baklava",
          price: "6",
          restaurantID: 1,
          itemType: DESSERT
        },
        {
          name: "Hummus",
          price: "4.5",
          restaurantID: 1,
          itemType: SIDES
        },
        {
          name: "Pizza",
          price: "11",
          restaurantID: 2,
          itemType: MAIN_COURSE
        },
        {
          name: "Hot Dog",
          price: "3.5",
          restaurantID: 2,
          itemType: APPETIZERS
        },
        {
          name: "Ben & Jerry's chocolate Ice Cream",
          price: "8.99",
          restaurantID: 2,
          itemType: DESSERT
        }
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {}
};
