const Sequelize = require("sequelize");
const config = require("./config/config.js");
let sequelize;
let env = process.env.NODE_ENV || "development";
if (env === "development") {
  sequelize = new Sequelize("pamperTest", "root", "password", {
    host: "localhost",
    dialect: "mysql",
    operatorsAliases: false,
  });
} else if (env === "production") {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: "mysql",
      operatorsAliases: false,
    }
  );
}

module.exports = sequelize;

global.sequelize = sequelize;

// const mysql = require("mysql");

// const db = mysql.createConnection ({
//     host: "localhost",
//     user: 'root',
//     password: 'password',
//     database: 'pamperTest'
// });
// db.connect((err) => {
//     if (err) {
//         throw err;
//     }
//     console.log('Connected to database');
// });
// module.exports = db;
