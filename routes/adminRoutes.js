const mongoose = require("mongoose");
// const Restaurants = mongoose.model('restaurants');
// const RestaurantItems = mongoose.model('restaurantitems');
const Restaurants = require("../models/Restaurant");
const RestaurantItems = require("../models/RestaurantItems");
Restaurants.hasMany(RestaurantItems, { as: "Items", foreignKey: 'restaurantID'});
RestaurantItems.belongsTo(Restaurants, { as: "Restaurant", foreignKey: 'restaurantID'});

const errHandler = (err) =>{
    console.log("Error :: "+ err);
}

module.exports = app =>{

    app.get("/api/admin/restaurants", async (req, res) => {
        const restaurants = await Restaurants.findAll({include: [{model: RestaurantItems, as: "Items"}]}).catch(errHandler);
        res.send(restaurants);
    });

    app.get("/api/admin/restaurants/items", async (req, res) => {
        // console.log(req);
        const items = await RestaurantItems.findAll();
        res.send(items);
    });

    app.post("/api/admin/restaurants/create", async (req, res)=>{
        console.log(req.body.values);
        const {name, phone, address, lat, lng} = req.body.values;
        const data = {
            name,
            phone,
            address,
            lat,
            lng
        };
        
        try{
            const restaurant  = await Restaurants.create(data).catch(errHandler);
            res.send(restaurant);
        }catch(err){
            res.status(422).send(err);
        }
        
    });
    app.post("/api/admin/restaurants/items/create", async (req, res)=>{
        console.log("item values are");
        console.log(req.body.values);
        const {newItem, selectedRestaurant} = req.body.values;
        console.log(selectedRestaurant.ID);
        const restaurantItem = {
            restaurantID: selectedRestaurant.ID,
            name: newItem.name,
            price: newItem.price
            // type: newItem.type
        };
        try{
            const newItem = await RestaurantItems.create(restaurantItem).catch(errHandler);
            // await restaurantItem.save();
            res.send(newItem);
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