// const mongoose = require('mongoose');
// const Restaurant = mongoose.model("restaurants");
// const Order  =mongoose.model('Orders');
const Order = require("../models/Order");
const OrderItems = require("../models/OrderItems");
// const Item = require("../models/RestaurantItems");
// const OrderItems  =mongoose.model('OrderItems');
// const ObjectId = mongoose.Types.ObjectId;

const Restaurants = require("../models/Restaurant");
const RestaurantItems = require("../models/RestaurantItems");
// Restaurants.hasMany(RestaurantItems, { as: "Items", foreignKey: 'restaurantID'});
// RestaurantItems.belongsTo(Restaurants, { as: "Restaurant", foreignKey: 'restaurantID'});

// Order.hasMany(OrderItems, { as: "OrderItems", foreignKey: 'orderID'});
// OrderItems.belongsTo(Order, { as: "Order", foreignKey: 'orderID'});

// OrderItems.hasOne(Item, { as: "Item", foreignKey: "itemID"});
// Item.belongsTo(OrderItems, { as: "OrderItems", foreignKey: "itemID"});


const errHandler = (err) =>{
    console.log("Error :: "+ err);
}


module.exports = app =>{
    app.get("/api/restaurants", async (req, res)=>{
        const restaurants = await Restaurants.findAll({include: [{model: RestaurantItems, as: "Items"}]}).catch(errHandler);
        // console.log("restaurants are");
        // console.log(restaurants);
        res.send(restaurants);
    });

    app.post("/api/order/addItem", async (req, res) => {
        const { order, user, item} = req.body;
        let currentOrder = {};
        let values={};
        // const { order, orderItems } = order;
        if(!order){
            let total = 0;
            if(user){
                currentOrder  = new Order({
                    user: user._id,
                    is_confirmed: false,
                    total: total
                });
                await currentOrder.save();
                let orderItem  = new OrderItems({
                    order: currentOrder._id,
                    item: item
                });
                orderItem.quantity +=1;
                await orderItem.save();
                currentOrder.total+= (item.price * orderItem.quantity);
                currentOrder.orderItems.push(orderItem);
                await currentOrder.save();
                values['order'] = currentOrder;
                values['orderItem'] = orderItem;
                
            }
        }
        else if(order){
            // console.log(order);
            let orderItems = order.orderItems;
            let orderTotal = order.total;
            let currentOrder  = await Order.findById(order._id);
            // currentOrder = await  currentOrder.toJSON();
            if(orderItems && orderItems.length){    // check if order already has some orderItems
                var orderItemPresent = orderItems.filter(orderItem => orderItem.item._id == item._id);
                if(orderItemPresent && orderItemPresent.length){    // check if item in order items
                    let orderItemIndex = currentOrder.orderItems.findIndex(x=> x.item._id==orderItemPresent[0].item._id);
                    let newquantity = currentOrder.orderItems[orderItemIndex].quantity +=1;
                    currentOrder.total += orderItemPresent[0].item.price;
                    let total = order.total + orderItemPresent[0].item.price;
                    let cond = {
                        _id : order._id,
                        orderItems: {
                            $elemMatch : {
                                "item._id" : item._id
                            }
                        }  
                    };
                    
                    let update = {
                        "total": total,
                        "orderItems.$.quantity":  newquantity
                    }
                    let myOrder = await Order.findOneAndUpdate(cond, update, {new: true}).exec();
                    myOrder = await myOrder.toJSON();
                    console.log("data is");
                    console.log(myOrder);

                    values['order'] = myOrder;

                }else{
                    let newOrderItem = new OrderItems({
                        order: currentOrder._id,
                        item: item
                    });
                    newOrderItem.quantity +=1;
                    await newOrderItem.save();
                    currentOrder.total += item.price;
                    currentOrder.orderItems.push(newOrderItem);
                    // let newOrder = await Order.findByIdAndUpdate(currentOrder._id, { $push : {orderItems : newOrderItem }});
                    let newOrder = await currentOrder.save();
                    values['order'] = await newOrder.toJSON();
                }
                // orderTotal += orderItemPresent.item.price;
            }
            else{
                let newOrderItem = new OrderItems({
                    order: currentOrder._id,
                    item: item
                });
                newOrderItem.quantity +=1;
                await newOrderItem.save();
                currentOrder.total += item.price;
                currentOrder.orderItems.push(newOrderItem);
                let newOrder = await currentOrder.save();
                values['order'] = newOrder;
            }
        }
        values['user'] = user;

        req.session.order = JSON.stringify(values);
        res.send(req.session.order);
    });


    app.post("/api/order/removeItem", async (req, res) => {

        const { order, user, item} = req.body;
        console.log(order);
        let values={};
        if(order){
            let orderItems = order.orderItems;
            let currentOrder = await Order.findById(order._id);
            currentOrder = await  currentOrder.toJSON();
            if(order.orderItems && order.orderItems.length){
                var orderItemPresent = orderItems.filter(orderItem => orderItem.item._id == item._id);
                if(orderItemPresent && orderItemPresent.length){
                    let orderItemIndex = currentOrder.orderItems.findIndex(x=> x.item._id==orderItemPresent[0].item._id);
                    let newquantity = order.orderItems[orderItemIndex].quantity - 1;
                    let newTotal = order.total - orderItemPresent[0].item.price;

                    let cond = {
                        _id : order._id,
                        orderItems: {
                            $elemMatch : {
                                "item._id" : item._id
                            }
                        }  
                    };
                    let update = {
                        
                        
                            "total": newTotal,
                            "orderItems.$.quantity": newquantity
                        
                    };
                    if(newquantity >= 1){
                        let newOrder = await Order.findOneAndUpdate(cond, update, {new: true});
                        values['order']= await newOrder.toJSON();
                    }else{
                        let newOrder = await Order.findByIdAndUpdate(
                            ObjectId(order._id), 
                            {$pull: { 'orderItems' : { '_id' : ObjectId(orderItemPresent[0]._id)} }, $set: {"total" :newTotal} }, 
                            {new: true});                        
                        values['order']= await newOrder.toJSON();
                    }

                }
            }
            
        }
        values['user'] = user;
        req.session.order = JSON.stringify(values);
        res.send(req.session.order);
        
    });
}