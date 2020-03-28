const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./keys/keys");
require("./db.js");
// require('./dbBootstrap.js')();
require("./models/Users");
require("./models/Restaurant");
require("./models/RestaurantItems");
// require("./models/Order");
// require("./models/OrderItems");
// require("./models/OrderRestaurant");
require("./services/passport");

// mongoose.connect(keys.mongooseURI,{useFindAndModify: false,  useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/adminRoutes")(app);
// require("./routes/appRoutes")(app);
require("./routes/restaurantRoutes")(app);
require("./routes/userRoutes")(app);

const PORT = process.env.PORT || 5050;
app.listen(PORT);
