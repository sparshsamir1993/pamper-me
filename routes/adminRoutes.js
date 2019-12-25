const mongoose = require("mongoose");
const Restaurants = mongoose.model('restaurants');
const RestaurantItems = mongoose.model('restaurantitems');
module.exports = app =>{

    app.get("/api/admin/restaurants", async (req, res) => {
        const restaurants = await Restaurants.find();
        res.send(restaurants);
    });

    app.get("/api/admin/restaurants/items", async (req, res) => {
        // console.log(req);
        const items = await RestaurantItems.find({restaurant:req.query.selectedRestaurant});
        res.send(items);
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
    app.post("/api/admin/restaurants/items/create", async (req, res)=>{
        console.log("item values are");
        console.log(req.body.values);
        const {newItem, selectedRestaurant} = req.body.values;
        const restaurantItem = new RestaurantItems({
            restaurant: selectedRestaurant._id,
            name: newItem.name,
            price: newItem.price,
            type: newItem.type
        });
        try{
            await restaurantItem.save();
            res.send(restaurantItem);
        }catch(err){
            res.status(422).send(err);
        }
        
    });   
    
    app.post("/api/admin/restaurants/items/update", async (req, res)=>{
        console.log("item values are");
        // console.log(req.body.values);
        const {itemToUpdate, selectedRestaurant} = req.body.values;

        let update= {
            name: itemToUpdate.name,
            price: itemToUpdate.price,
            type: itemToUpdate.type
        }
        
        try{
            const updatedItem = await RestaurantItems.findByIdAndUpdate( itemToUpdate._id, update, {new: true});
            // await restaurantItem.save();
            console.log(updatedItem);
            res.send(updatedItem);
        }catch(err){
            res.status(422).send(err);
        }
        
    });       

    app.post("/api/admin/restaurants/items/delete", async (req, res)=>{
        console.log("item is");
        // console.log(req.body.values);
        // const {item} = req.body.values;
        console.log(req.body.values);
        const {item, selectedRestaurant} = req.body.values; 
        try{
            const deletedItem = await RestaurantItems.findByIdAndDelete( item._id);
            // await restaurantItem.save();
            console.log(deletedItem);
            res.send(deletedItem);
        }catch(err){
            res.status(422).send(err);
        }
        
    });
}