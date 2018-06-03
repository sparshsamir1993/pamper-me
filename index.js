const express = require('express');
const mongoose = require("mongoose");
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require("./keys/keys");

mongoose.connect(keys.mongooseURI);



const app = express();

require("./routes/appRoutes")(app);

const PORT = process.env.PORT || 5050;
app.listen(PORT);