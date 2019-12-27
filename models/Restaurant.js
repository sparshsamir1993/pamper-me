const Sequelize = require("sequelize");

module.exports = sequelize.define("Restaurants",{
    ID: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone:{
        type: Sequelize.STRING(13),
        allowNull: false
    },
    address: Sequelize.STRING,
    lat: Sequelize.STRING,
    lng: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});


// const mongoose = require('mongoose');
// const { Schema } = mongoose;
// const ItemSchema = require("./RestaurantItems");
// const restaurantSchema = new Schema({
//     name: String,
//     address: String,
//     phoneNumber: String,
//     restaurantItems: [{ type: Schema.Types.ObjectId, ref: 'RestaurantItems' }]

// });

// mongoose.model("restaurants",restaurantSchema);