const Sequelize = require("sequelize");

module.exports = sequelize.define("Orders",{
    ID: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    grand_total: Sequelize.DECIMAL(10,2),
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});



// const mongoose = require('mongoose');
// const { Schema } = mongoose;
// const OrderItemSchema = require("./OrderItems");

// const orderSchema = new Schema({
//     user: { type: Schema.Types.ObjectId, ref: 'users' },
//     is_confirmed: Boolean,
//     total: {type: Number,  default: 0},
//     orderItems: [OrderItemSchema]
// });

// mongoose.model("Orders",orderSchema);