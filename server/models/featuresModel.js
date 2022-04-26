const featuresModel = (sequelize, { DataTypes }) => {
  const Features = sequelize.define('features', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      validate: {
        notEmpty: true,
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    feature: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  // Features.associate = (models) => {
  //   Features.belongsTo(models.Product);
  // };

  Features.findFeaturesByProductId = async (productId) => {
    const feats = await Features.findAll({
      where: { product_id: productId }, // consider omitting created_at & updated_at colns
      attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'product_id'] }, // also, can use "include: ['...']"
    });
    // console.log('feats: ', feats);
    return feats; // must be an array of objs
  };

  return Features;
};

// export default featuresModel;
module.exports = featuresModel;
