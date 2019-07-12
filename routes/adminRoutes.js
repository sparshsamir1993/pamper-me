const mongoose = require("mongoose");
const Restaurants = mongoose.model('Restaurants');
module.exports = app =>{

    app.get("/api/admin/restaurants", async (req, res) => {
        const restaurants = await Restaurants.find();
        console.log("sparsh" + restaurants);
        res.send(restaurants);
    });

    app.post("/api/admin/restaurants/create", async (req, res)=>{
        console.log(req.body.values);
        const {name, contact} = req.body.values;
        const restaurant = new Restaurants({
            name,
            phoneNumber: contact
        });
        try{
            await restaurant.save();
            res.send(restaurant);
        }catch(err){
            res.status(422).send(err);
        }
        
    });
}