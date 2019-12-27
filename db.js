const Sequelize = require("sequelize");
const sequelize = new Sequelize("pamperTest","root", "password", { host: "localhost", dialect: "mysql", operatorsAliases: false});

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


