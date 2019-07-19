const mongoose = require('mongoose');
const { Schema } = mongoose;
const restaurantSchema = require("./Restaurant");

const orderRestaurantSchema = new Schema({
    order: { type: Schema.Types.ObjectId, ref: 'Orders'},
    restaurant: {restaurantSchema}
});

mongoose.model("ordersrestaurants",orderRestaurantSchema);