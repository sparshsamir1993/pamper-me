const mongoose = require('mongoose');
const { Schema } = mongoose;

const restaurantSchema = new Schema({
    name: String,
    address: String,
    phoneNumber: String,
    restaurantItems: [{ type: Schema.Types.ObjectId, ref: 'RestaurantItems' }]

});

mongoose.model("Restaurants",restaurantSchema);