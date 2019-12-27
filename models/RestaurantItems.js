const Sequelize = require("sequelize");

module.exports = sequelize.define("Items",{
    ID: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type:Sequelize.STRING(200),
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});


// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const restaurantItemSchema = new Schema({
//     restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
//     name: String,
//     price: Number,
//     type: String
// });

// mongoose.model("restaurantitems",restaurantItemSchema);