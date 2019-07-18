const mongoose = require('mongoose');
const { Schema } = mongoose;

const restaurantItemSchema = new Schema({
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
    name: String,
    price: Number,
    type: String
});

mongoose.model("restaurantitems",restaurantItemSchema);