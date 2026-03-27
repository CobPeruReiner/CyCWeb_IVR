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
  define: { timestamps: false },
  pool: {
    max: parseInt(process.env.DB_POOL_MAX || "8", 10),
    min: parseInt(process.env.DB_POOL_MIN || "2", 10),
    acquire: parseInt(process.env.DB_POOL_ACQUIRE || "8000", 10),
    idle: parseInt(process.env.DB_POOL_IDLE || "10000", 10),
    evict: 1000,
  },
  retry: { max: parseInt(process.env.DB_RETRY_MAX || "2", 10) },
  dialectOptions: {},
});

module.exports = { db };
