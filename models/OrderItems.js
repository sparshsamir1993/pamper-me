const Sequelize = require("sequelize");

module.exports = sequelize.define("OrderItems",{
    ID: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});



// const mongoose = require('mongoose');
// const { Schema } = mongoose;
// const restaurantItemSchema = require("./RestaurantItems");

// const orderItemsSchema = new Schema({
//     order: { type: Schema.Types.ObjectId, ref: 'Orders'},
//     item: restaurantItemSchema,
//     quantity: {type: Number, default: 0}
// });

// mongoose.model("OrderItems",orderItemsSchema);