const Restaurants = require("../models/Restaurant");
const RestaurantItems = require("../models/RestaurantItems");
const Users = require("../models/Users");
const Orders = require("../models/Order");
const OrderItems = require("../models/OrderItems");
const RestaurantMenuSections = require("../models/RestaurantMenuSections");

Restaurants.hasMany(RestaurantItems, {
  as: "Items",
  foreignKey: "restaurantID",
});
RestaurantItems.belongsTo(Restaurants, {
  as: "Restaurant",
  foreignKey: "restaurantID",
});

Users.hasMany(Orders, { as: "Orders", foreignKey: "userID" });
Orders.belongsTo(Users, { as: "Order", foreignKey: "userID" });

Orders.hasMany(OrderItems, { as: "OrderItems", foreignKey: "orderID" });
OrderItems.belongsTo(Orders, { as: "Order", foreignKey: "orderID" });

RestaurantItems.hasMany(OrderItems, { as: "Item", foreignKey: "itemID" });
OrderItems.belongsTo(RestaurantItems, { as: "Item", foreignKey: "itemID" });

Restaurants.hasMany(RestaurantMenuSections, {
  as: "RestaurantMenuSections",
  foreignKey: "restaurantID",
});
RestaurantMenuSections.belongsTo(Restaurants, {
  as: "Restaurant",
  foreignKey: "restaurantID",
});

const errHandler = (err) => {
  console.log("Error :: " + err);
};

module.exports = (app) => {
  app.get("/api/admin/restaurants", async (req, res) => {
    const restaurants = await Restaurants.findAll({
      include: [{ model: RestaurantItems, as: "Items" }],
    }).catch(errHandler);
    res.send(restaurants);
  });

  app.get("/api/admin/restaurants/items", async (req, res) => {
    // console.log(req.query);
    const { selectedRestaurant } = req.query;
    const items = await RestaurantItems.findAll({
      where: { restaurantID: selectedRestaurant },
    });
    res.send(items);
  });

  app.post("/api/admin/restaurants/create", async (req, res) => {
    console.log(req.body.values);
    const { name, phone, address, lat, lng } = req.body.values;
    const data = {
      name,
      phone,
      address,
      lat,
      lng,
    };

    try {
      const restaurant = await Restaurants.create(data).catch(errHandler);
      res.send(restaurant);
    } catch (err) {
      res.status(422).send(err);
    }
  });
  app.post("/api/admin/restaurants/items/create", async (req, res) => {
    console.log("item values are");
    console.log(req.body.values);
    const { newItem, selectedRestaurant } = req.body.values;
    console.log(selectedRestaurant.ID);
    const restaurantItem = {
      restaurantID: selectedRestaurant.ID,
      name: newItem.name,
      price: newItem.price,
      itemType: newItem.itemType,
    };
    try {
      const newItem = await RestaurantItems.create(restaurantItem).catch(
        errHandler
      );
      // await restaurantItem.save();
      res.send(newItem);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post("/api/admin/restaurants/items/update", async (req, res) => {
    console.log("item values are");
    // console.log(req.body.values);
    const { itemToUpdate, selectedRestaurant } = req.body.values;
    console.log("itemtoupdate is ", itemToUpdate);
    let update = {
      name: itemToUpdate.name,
      price: itemToUpdate.price,
      itemType: itemToUpdate.itemType,
    };

    try {
      const item = await RestaurantItems.findOne({
        where: { ID: itemToUpdate.ID },
      }).catch(errHandler);
      const updStat = await item.update(update).catch(errHandler);
      console.log(item.dataValues);
      res.send(updStat);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post("/api/admin/restaurants/items/delete", async (req, res) => {
    console.log("item is");
    const { item, selectedRestaurant } = req.body.values;
    try {
      const deletedItem = await RestaurantItems.findByIdAndDelete(item._id);
      res.send(deletedItem);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.put("/api/admin/restaurants", async (req, res) => {
    console.log(req.body);
    let update = req.body.values;
    let restaurant = await Restaurants.findOne({
      where: { ID: update.ID },
    }).catch(errHandler);
    const updatedRes = await restaurant.update(update).catch(errHandler);
    // console.log(updatedRes.ID);
    if (updatedRes.ID) {
      res.status(200).json(updatedRes);
    } else {
      res.status(500).send("could not update");
    }
  });

  app.post("/api/admin/restaurantMenuSection", async (req, res) => {
    console.log(req.body);
    let newMenuSection = await RestaurantMenuSections.create(req.body).catch(
      errHandler
    );
    res.status(200).send(newMenuSection);
  });
};
