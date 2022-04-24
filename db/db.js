// const { Sequelize } = require('sequelize');
import { Sequelize, Model, DataTypes } from 'sequelize'
require("dotenv").config();
const { Pool, Client } = require('pg');

// Passing parameters separately (other dialects)
// using process.env variables from ../.env
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASS {
//     host: process.env.DB_HOST,
//     port: process.env.PORT,
//     dialect: 'postgres'/* one of 'mysql' | 'mariadb' | 'mssql' */
// });

// getProducts: {
//   products.findAll({ limit: 10 })
// }

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

products.findAll({ limit: 10 })

sequelize.close()