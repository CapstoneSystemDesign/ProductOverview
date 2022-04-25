const productModel = (sequelize, { DataType }) => {
  const Product = sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    default_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  });

  Product.findAll = async () => {
    let products = await Product.findAll({
      limit: 10
    });
    return products;
  };

  Product.findById = async (productId) => {
    let product = await Product.findOne({
      where: { id: productId },
    });
    return product;
  };

  return Product;
};

export default productModel;