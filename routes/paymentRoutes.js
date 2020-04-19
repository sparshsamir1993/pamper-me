const Payments = require("../models/Payments");
const Order = require("../models/Order");
const errHandler = (err) => {
  console.log("\n\n  *****  Error in Pyamnets Route **** :: \n\n\n" + err);
};

module.exports = (app) => {
  app.post("/api/payments", async (req, res) => {
    const newPayment = {
      paymentType: req.body.paymentType,
      amount: req.body.grandTotal,
      orderID: req.body.order.ID,
    };
    const result = await Payments.create(newPayment).catch(errHandler);
    const orderData = {
      grand_total: req.body.grandTotal,
      addressID: req.body.currentAddress.ID,
      is_confirmed: true,
    };
    const orderUpdate = await Order.update(orderData, {
      where: {
        ID: req.body.order.ID,
      },
    }).catch(errHandler);
    console.log(orderUpdate);
    const returnVal = {
      orderUpdated: orderUpdate[0] >= 1,
      address: req.body.currentAddress,
      payment: {
        ID: result.ID,
        amount: result.amount,
        paymentType: result.paymentType,
        paymentSuccessful: result.paymentSuccessful,
        orderID: result.orderID,
      },
    };
    res.status(200).send(returnVal);
  });
};
