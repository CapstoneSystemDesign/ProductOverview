const productsModel = (sequelize, { DataTypes }) => {
  const Product = sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slogan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    default_price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Product.allProducts = async () => {
    const products = await Product.findAll({
      limit: 10, // will need to remove when ready for final release
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    return products;
  };

  Product.findById = async (productId) => {
    const product = await Product.findOne({
      where: { id: productId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    return product;
  };

  return Product;
};

module.exports = productsModel;
