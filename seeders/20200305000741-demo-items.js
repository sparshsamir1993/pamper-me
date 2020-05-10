"use strict";

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
          itemType: "èntres",
          restaurantID: 1,
        },
        {
          name: "Chicken Shawarma",
          price: "8.50",
          itemType: "Wraps and Sandwiches",
          restaurantID: 1,
        },
        {
          name: "Hummus",
          price: "6.49",
          itemType: "Appetizers and Salads",
          restaurantID: 1,
        },
        {
          name: "Garden Salad",
          price: "6.39",
          itemType: "Appetizers and Salads",
          restaurantID: 1,
        },
        {
          name: "Ceasar Salad",
          price: "6.39",
          itemType: "Appetizers and Salads",
          restaurantID: 1,
        },
        {
          name: "Fatoush Salad",
          price: "6.39",
          itemType: "Appetizers and Salads",
          restaurantID: 1,
        },
        {
          name: '8" Beef Shawarma',
          price: "10.49",
          itemType: "Wraps and Sandwiches",
          restaurantID: 1,
        },
        {
          name: '8" Philly cheese Chicken in a bun or a wrap',
          price: "9.39",
          itemType: "Wraps and Sandwiches",
          restaurantID: 1,
        },
        {
          name: "Chicken Shawarma Platter",
          price: "16.99",
          itemType: "Entrees",
          restaurantID: 1,
        },
        {
          name: "Half & Half Beef (small)",
          price: "9.99",
          itemType: "Entrees",
          restaurantID: 1,
        },
        {
          name: '8" Falafel Wrap',
          price: "7.49",
          itemType: "Vegetarian",
          restaurantID: 1,
        },
        {
          name: "Falafel on Rocks",
          price: "9.49",
          itemType: "Vegetarian",
          restaurantID: 1,
        },
        {
          name: "Canned Pop",
          price: "1.49",
          itemType: "Beverages",
          restaurantID: 1,
        },
        {
          name: "Bottled Pop",
          price: "2.99",
          itemType: "Beverages",
          restaurantID: 1,
        },
        {
          name: "Crispy Golden French Fries",
          price: "3.99",
          itemType: "Sides",
          restaurantID: 1,
        },
        {
          name: "Rice",
          price: "2.79",
          itemType: "Sides",
          restaurantID: 1,
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {},
};
