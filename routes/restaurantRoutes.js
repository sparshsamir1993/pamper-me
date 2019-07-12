const mongoose = require('mongoose');
const Restaurant = mongoose.model("Restaurants");

module.exports = app =>{
    app.get("/restaurants", async (req, res)=>{
        const restaurants = await Restaurant.find().all();
        console.log(restaurants);
    });
}