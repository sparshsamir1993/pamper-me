const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./keys/keys");
require("./db.js");
require("./models/Users");
require("./models/Restaurant");
require("./models/RestaurantItems");
require("./services/passport");

const app = express();
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/adminRoutes")(app);
// require("./routes/appRoutes")(app);
require("./routes/restaurantRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/paymentRoutes")(app);
if (process.env.NODE_ENV === "production") {
  //to serve main.js & main.css
  app.use(express.static("client/build"));

  //this code will be executed only if above all app.use() fails.
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
}
const PORT = process.env.PORT || 5050;
app.listen(PORT);
