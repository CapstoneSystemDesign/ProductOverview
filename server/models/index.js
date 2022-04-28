require('dotenv').config();
const Sequelize = require('sequelize');

const productsModel = require('./productsModel');
const featuresModel = require('./featuresModel');
const stylesModel = require('./stylesModel');
const photosModel = require('./photosModel');
const skusModel = require('./skusModel');
const relatedModel = require('./relatedModel');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  },
);

const models = {
  Product: productsModel(sequelize, Sequelize),
  Features: featuresModel(sequelize, Sequelize),
  Styles: stylesModel(sequelize, Sequelize),
  Photos: photosModel(sequelize, Sequelize),
  Skus: skusModel(sequelize, Sequelize),
  Related: relatedModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

module.exports.sequelize = sequelize;
module.exports.models = models;
