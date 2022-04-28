require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const db = require('./models/index');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/products', (req, res) => {
  db.models.Product.allProducts({})
    .then((returnedProducts) => {
      res.json(returnedProducts);
    });
});

app.get('/products/:productId', (req, res) => {
  const product = db.models.Product.findById(req.params.productId);
  const features = db.models.Features.findFeaturesByProductId(req.params.productId);
  Promise
    .all([product, features])
    .then(([prdt, feat]) => {
      const prod = prdt;
      prod.dataValues.features = feat;
      res.json(prod);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get('/products/:product_id/styles', (req, res) => {
  const styles = db.models.Styles.getStylesByProductId(req.params.product_id);
  Promise
    .all([styles])
    .then((responses) => {
      const dataResponse = { product_id: String(req.params.product_id) };
      const style = responses[0];
      dataResponse.results = style;
      res.json(dataResponse);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get('/products/:product_id/related', (req, res) => {
  db.models.Related.allRelatedProducts(req.params.product_id)
    .then((returnedRelated) => {
      res.json(returnedRelated);
    });
});

db.sequelize.sync().then(() => {
  app.listen(process.env.SV_PORT, () => {
    console.log(`SDC backend server listening on port ${process.env.SV_PORT}...`);
  });
});
