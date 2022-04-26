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
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    default_price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  Product.allProducts = async () => {
    const products = await Product.findAll({
      limit: 10, // will need to remove when ready for final release
    });
    return products;
  };

  Product.findById = async (productId) => {
    const product = await Product.findOne({
      where: { id: productId }, // consider omitting created_at & updated_at colns
    });
    return product;
  };

  return Product;
};

// export default productsModel;
module.exports = productsModel;
