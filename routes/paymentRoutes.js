module.exports = (app) => {
  app.post("/api/payments", async (req, res) => {
    console.log(req.body);
    const newPayment = {
      paymentType: rq.body.paymentType,
      amount: req.body.grandTotal,
      orderID: req.body.order.ID,
    };
  });
};
