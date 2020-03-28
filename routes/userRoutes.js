const Addresses = require("../models/Addresses");
const Users = require("../models/Users");

Users.hasMany(Addresses, {
  as: "Addresses",
  foreignKey: "userID"
});

Addresses.belongsTo(Users, {
  as: "User",
  foreignKey: "userID"
});
const errHandler = err => {
  console.log("Error :: " + err);
};

module.exports = app => {
  app.get("/api/user/addresses", async (req, res) => {
    const addresses = await Addresses.findAll({
      where: { userID: req.body }
    }).catch(errHandler);
    res.status(200).send(addresses);
  });
};
