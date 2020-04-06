const Addresses = require("../models/Addresses");
const Users = require("../models/Users");

Users.hasMany(Addresses, {
  as: "Addresses",
  foreignKey: "userID",
});

Addresses.belongsTo(Users, {
  as: "User",
  foreignKey: "userID",
});
const errHandler = (err) => {
  console.log("Error :: " + err);
};

module.exports = (app) => {
  app.get("/api/user/addresses", async (req, res) => {
    console.log(req.query.userID);
    const addresses = await Addresses.findAll({
      where: { userID: req.query.userID },
    }).catch(errHandler);
    res.status(200).send(addresses);
  });

  app.post("/api/user/addresses", async (req, res) => {
    console.log(req.body);
    const {
      name,
      buildingNumber,
      street,
      city,
      province,
      country,
      postalCode,
      detailedAddress,
      additionalDirections,
      userID,
      currentAddress,
    } = req.body;
    const newAddressData = {
      name,
      buildingNumber,
      street,
      city,
      province,
      country,
      postalCode,
      detailedAddress,
      additionalDirections,
      userID,
    };
    try {
      let newAddress = await Addresses.create(newAddressData).catch(errHandler);
      console.log(currentAddress);
      if (currentAddress) {
        const result = await Users.update(
          { currentAddress: newAddress.ID },
          { where: { ID: userID } }
        ).catch(errHandler);
        console.log("result is.....\n\n\n\n");
        console.log(result);
        if (result.length) {
          // newAddress = { ...newAddress, userUpdated: true };
          newAddress.dataValues.userUpdated = true;
        }
      }
      console.log(newAddress);

      res.status(200).json(newAddress);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });
  app.put("/api/user/addresses", async (req, res) => {
    console.log(req.body);
    const {
      name,
      buildingNumber,
      street,
      city,
      province,
      country,
      postalCode,
      detailedAddress,
      additionalDirections,
      userID,
      addressID,
    } = req.body;
    const newAddressData = {
      name,
      buildingNumber,
      street,
      city,
      province,
      country,
      postalCode,
      detailedAddress,
      additionalDirections,
      userID,
    };
    try {
      const updatedAddress = await Addresses.update(newAddressData, {
        where: { ID: addressID },
      }).catch(errHandler);
      console.log(updatedAddress);
      res.status(200).json(updatedAddress);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });

  app.delete("/api/user/addresses", async (req, res) => {
    const { addressID } = req.query;
    const result = await Addresses.destroy({ where: { ID: addressID } });
    res.status(200).json(result);
  });

  app.put("/api/user", async (req, res) => {
    const { userID, addressID } = req.body;
    try {
      const result = await Users.update(
        { currentAddress: addressID },
        { where: { ID: userID } }
      );
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  });
};
