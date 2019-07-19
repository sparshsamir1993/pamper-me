const mongoose = require('mongoose');
const { Schema } = mongoose;
const restaurantItemSchema = require("./RestaurantItems");

const orderItemsSchema = new Schema({
    order: { type: Schema.Types.ObjectId, ref: 'Orders'},
    item: restaurantItemSchema,
    quantity: {type: Number, default: 0}
});

mongoose.model("OrderItems",orderItemsSchema);