const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    googleId: String,
    email: String,
    is_admin: Boolean

});

mongoose.model("users",userSchema);