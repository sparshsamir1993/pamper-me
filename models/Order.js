const mongoose = require('mongoose');
const { Schema } = mongoose;
const OrderItemSchema = require("./OrderItems");

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    is_confirmed: Boolean,
    total: {type: Number,  default: 0},
    orderItems: [OrderItemSchema]
});

mongoose.model("Orders",orderSchema);