// import 'dotenv/config';
// import express from 'express';
// import cors from 'cors';
// import morgan from 'morgan';
// import helmet from 'helmet';
// import bodyParser from 'body-parser';
// import models, { sequelize } from './models/index';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const dbModels = require('./models/index');
const db = require('./models/index');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/products', (req, res) => {
  dbModels.models.Product.allProducts({})
    .then((returnedProducts) => {
      // console.log(returnedProducts);
      res.json(returnedProducts);
    });
});

app.get('/products/:productId', (req, res) => {
  const product = dbModels.models.Product.findById(req.params.productId);
  const features = dbModels.models.Features.findFeaturesByProductId(req.params.productId);
  Promise
    .all([product, features])
    .then((responses) => {
      let prod = responses[0];
      const feat = responses[1];
      prod.dataValues.features = feat;
      prod = JSON.stringify(prod);
      // console.log('prod, after stringify: ', prod);
      res.send(prod);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get('/products/:product_id/styles', (req, res) => {
  const styles = dbModels.models.Styles.getStylesByProductId(req.params.product_id);

  Promise
    .all([styles])
    .then((responses) => {
      const dataResponse = { product_id: req.params.product_id, results: [] };

      const style = responses[0];
      // style = JSON.stringify(style);
      dataResponse.results.push(style);
      // console.log('prod, after stringify: ', prod);
      res.send(dataResponse);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get('/products/:product_id/related', (req, res) => {
  res.send('GET related items by product id response: successful');
});

db.sequelize.sync().then(() => {
  app.listen(process.env.SV_PORT, () => {
    console.log(`SDC backend server listening on port ${process.env.SV_PORT}...`);
  });
});

/*
app.get('/products/:productId', (req, res) => {
  // console.log('req.params.product_id: ', req.params.product_id);
  dbModels.models.Product.findById(req.params.productId)
    .then((returnedProduct) => {
      const features = dbModels.models.Features.findFeaturesByProductId(req.params.productId);
      return [returnedProduct, features];
      // .then((returnedFeatures) => {
      //   const features = JSON.stringify(returnedFeatures);
      //   console.log('returnedFeatures, in express: ', returnedFeatures);

      //   const product = JSON.stringify(returnedProduct);
      //   product.features = features;
      //   console.log('product, in express: ', product);
      //   return product;
      // })
      // .then((product) => {
      //   res.send(product);
      // })
      // .catch((err) => console.error(err));
    })
    .then((resPackage) => {
      const features = JSON.stringify(resPackage[1]);
      console.log('returnedFeatures, in express: ', resPackage[1]);

      const product = JSON.stringify(resPackage[0]);
      product.features = features;
      console.log('product, in express: ', product);
      res.send(product);
      // return product;
    })
    .catch((err) => console.error(err));
});
*/
