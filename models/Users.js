const Sequelize = require("sequelize");

module.exports = sequelize.define("Users",{
    ID: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type:Sequelize.STRING(200)
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    password:{
      type: Sequelize.STRING(100)
    },
    googleID: {
        type: Sequelize.STRING(100)
    },
    is_admin:{
      type: Sequelize.BOOLEAN,
      defaultValue: false

    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });

// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const userSchema = new Schema({
//     name: String,
//     googleId: String,
//     email: String,
//     is_admin: Boolean

// });

// mongoose.model("users",userSchema);