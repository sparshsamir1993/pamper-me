module.exports = async () => {
    
    
    const Restaurant = require("./models/Restaurant");
    const Item = require("./models/RestaurantItems");
    const Order = require("../models/Order");
    const OrderItems = require("../models/OrderItems");
    
    Restaurant.hasMany(Item, { as: "Items", foreignKey: 'restaurantID'});
    Item.belongsTo(Restaurant, { as: "Restaurant", foreignKey: 'restaurantID'});
    Order.hasMany(OrderItems, { as: "OrderItems", foreignKey: 'orderID'});
    OrderItems.belongsTo(Order, { as: "Order", foreignKey: 'orderID'});

    OrderItems.hasOne(Item, { as: "Item", foreignKey: "itemID"});
    Item.belongsTo(OrderItems, { as: "OrderItems", foreignKey: "itemID"});


    const errHandler = (err) =>{
        console.log("Error :: "+ err);
    }




    // const restaurant = await Restaurant.create({name: "Lazeez Shawarma"}).catch(errHandler);
    // const item = await Item.create({name: "Chicken on the rocks", price: "14.99", restaurantID: restaurant.ID}).catch(errHandler);

    const  res = await Restaurant.findAll({include: [{model: Item, as: "Items"}]}).catch(errHandler);
    console.log("resp is :::");
    console.log(typeof(res));
    console.log(JSON.stringify(res));
};