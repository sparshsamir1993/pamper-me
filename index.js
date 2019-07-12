const express = require('express');
const mongoose = require("mongoose");
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require("./keys/keys");
require("./models/Users");
require("./models/Restaurant");
require("./models/RestaurantItems");

mongoose.connect(keys.mongooseURI);



const app = express();
app.use(bodyParser.json());

require("./routes/appRoutes")(app);
require("./routes/restaurantRoutes")(app);
require("./routes/adminRoutes")(app);

const PORT = process.env.PORT || 5050;
app.listen(PORT);