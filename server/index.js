import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import models, { sequelize } from './models';

const app = express();

app.use(cors());

app.use((req, res, next) => {
  req.context = {
    models,
  };
  next();
});

app.get('/products', (req, res) => {
  res.send('GET product');
});
app.get('/products/:product_id', (req, res) => {
  res.send('GET product by id');
});

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
  });
});