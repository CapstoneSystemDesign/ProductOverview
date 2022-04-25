import Sequelize from 'sequelize';
import productModel from './productsModel';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.PORT,
    dialect: 'postgres'
  },
);

const models = {
  Product: productModel(sequelize, Sequelize)
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;