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
    console.log("\n\n  *****  Error  **** :: "+ err);
}


module.exports = app =>{
    app.get("/api/restaurants", async (req, res)=>{
        const restaurants = await Restaurants.findAll({include: [{model: RestaurantItems, as: "Items"}]}).catch(errHandler);
        // console.log("restaurants are");
        // console.log(restaurants);
        res.send(restaurants);
    });

    app.post("/api/order/addItem", async (req, res) => {
        const { order, user, item, newQuantity} = req.body;
        let currentOrder = {};
        let orderItem = {};
        let values={};
        // const { order, orderItems } = order;
        if(!order){
            let total = 0;
            if(user){
                const {ID} = user;
                try{
                    const data = {
                        userID: ID
                    };
                    currentOrder  = await Order.create(data).catch(errHandler);
                    console.log(currentOrder.dataValues);
                    let orderID = currentOrder.dataValues.ID;
                    const itemData = {
                        quantity: 1,
                        itemID: item.ID,
                        orderID    
                    }
                    orderItem = await OrderItems.create(itemData).catch(errHandler);

                }catch(err){
                    res.status(422).send(err);
                }
                total += item.price * orderItem.dataValues.quantity;
                currentOrder = await currentOrder.update({grand_total: total},{include: [{model: OrderItems, as: "OrderItems"}]}).catch(errHandler);
                // console.log(orderItem);
                // orderItem.quantity +=1;
                // await orderItem.save();
                // currentOrder.total+= (item.price * orderItem.quantity);
                // currentOrder.orderItems.push(orderItem);
                // await currentOrder.save();
                values['order'] = await Order.findOne({where: {ID : currentOrder.dataValues.ID}, include: [{model: OrderItems, as: "OrderItems"}]}).catch(errHandler);
                values['orderItem'] = orderItem.dataValues;
                
            }
        }
        else if(order){
            // console.log(order);
            let orderItems = order.OrderItems;
            let orderTotal = order.total;
            
            // currentOrder = await  currentOrder.toJSON();
            if(orderItems && orderItems.length){    // check if order already has some orderItems
                let orderItemPresent = orderItems.filter(orderItem => orderItem.itemID == item.ID)[0];
                if(orderItemPresent){    // check if item in order items
                    
                    let updatedOItem = await OrderItems.update({
                        quantity: newQuantity
                    },{
                        where:{
                            ID: orderItemPresent.ID
                        }
                    }).catch(errHandler);
                    
                    console.log(updatedOItem);

                    if(updatedOItem ==1){
                        let currentOrder  = await Order.findOne({where: {ID : order.ID}, include: [{model: OrderItems, as: "OrderItems"}]}).catch(errHandler);
                        console.log(currentOrder);
                        values['order'] = currentOrder;
                    }

                }else{
                    let data = {
                        orderID: order.ID,
                        itemID: item.ID,
                        quantity: 1
                    }
                    let orderItem = await OrderItems.create(data).catch(errHandler);
                    console.log("new order item is  \n");
                    console.log(orderItem);
                    order.OrderItems.push(orderItem);
                    // let newOrderItem = new OrderItems({
                    //     order: currentOrder._id,
                    //     item: item
                    // });
                    // newOrderItem.quantity +=1;
                    // await newOrderItem.save();
                    // currentOrder.total += item.price;
                    // currentOrder.orderItems.push(newOrderItem);
                    // let newOrder = await Order.findByIdAndUpdate(currentOrder._id, { $push : {orderItems : newOrderItem }});
                    // let newOrder = await currentOrder.save();
                    values['order'] = order;
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