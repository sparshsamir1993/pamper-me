const Order = require("../models/Order");
const OrderItems = require("../models/OrderItems");
const Restaurants = require("../models/Restaurant");
const RestaurantItems = require("../models/RestaurantItems");


const errHandler = (err) =>{
    console.log("\n\n  *****  Error  **** :: "+ err);
}


module.exports = app =>{
    app.get("/api/restaurants", async (req, res)=>{
        const restaurants = await Restaurants.findAll({include: [{model: RestaurantItems, as: "Items"}]}).catch(errHandler);
        res.send(restaurants);
    });

    app.post("/api/order/addItem", async (req, res) => {
        const { order, user, item, newQuantity} = req.body;
        let currentOrder = {};
        let orderItem = {};
        let values={};
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
                values['order'] = await Order.findOne({where: {ID : currentOrder.dataValues.ID}, include: [{model: OrderItems, as: "OrderItems"}]}).catch(errHandler);
                values['orderItem'] = orderItem.dataValues;
                
            }
        }
        else if(order){
            let orderItems = order.OrderItems;
            let orderTotal = order.total;
            
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

                    values['order'] = order;
                }
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
            try{
                let orderItems = order.OrderItems;
                let currentOrder = await Order.findOne({where: {ID : order.ID}, include: [{model: OrderItems, as: "OrderItems"}]}).catch(errHandler);
                // currentOrder = await  currentOrder.toJSON();
                if(order.OrderItems && order.OrderItems.length){
                    var orderItemPresent = orderItems.filter(orderItem => orderItem.itemID == item.ID);
                    if(orderItemPresent && orderItemPresent.length){
                        let orderItemIndex = currentOrder.OrderItems.findIndex(x=> x.itemID==orderItemPresent[0].itemID);
                        let newQuantity = order.OrderItems[orderItemIndex].quantity - 1;
                        // let newTotal = order.total - orderItemPresent[0].item.price;
    
                        let updatedOItem = await OrderItems.update({
                            quantity: newQuantity
                        },{
                            where:{
                                ID: orderItemPresent[0].ID
                            }
                        }).catch(errHandler);
    
                        if(updatedOItem == 1){
                            let currentOrder  = await Order.findOne({where: {ID : order.ID}, include: [{model: OrderItems, as: "OrderItems"}]}).catch(errHandler);
                            console.log(currentOrder);
                            values['order'] = currentOrder;         
                        }else{
                            // let newOrder = await Order.findByIdAndUpdate(
                            //     ObjectId(order._id), 
                            //     {$pull: { 'orderItems' : { '_id' : ObjectId(orderItemPresent[0]._id)} }, $set: {"total" :newTotal} }, 
                            //     {new: true});                        
                            // values['order']= await newOrder.toJSON();
                        }
                    }
                }                
            }catch(err){
                console.log(err);
            }
        }
        values['user'] = user;
        req.session.order = JSON.stringify(values);
        res.send(req.session.order);
    });
}