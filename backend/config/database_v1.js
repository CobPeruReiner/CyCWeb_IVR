const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

dotenv.config({ path: "./.env" });

const db = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  define: {
    timestamps: false,
  },
});

// const db = new Sequelize({
//   dialect: "mysql",
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT_MYSQL || 3306,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   logging: false,
//   define: {
//     timestamps: false,
//   },
// });

module.exports = { db };
