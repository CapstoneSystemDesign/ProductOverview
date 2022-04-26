// import Sequelize from 'sequelize';
// import 'dotenv/config';

// import productsModel from './productsModel';

require('dotenv').config();
const Sequelize = require('sequelize');

const productsModel = require('./productsModel'); // import more models
const featuresModel = require('./featuresModel'); // import more models

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    // logging: false,
  },
);

const models = {
  Product: productsModel(sequelize, Sequelize), // add more models
  Features: featuresModel(sequelize, Sequelize), // add more models
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

// export { sequelize };
// export default models;
module.exports.sequelize = sequelize;
module.exports.models = models;
