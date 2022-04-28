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

  Features.findFeaturesByProductId = async (productId) => {
    const feats = await Features.findAll({
      where: { product_id: productId },
      attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'product_id'] },
    });
    return feats;
  };

  return Features;
};

module.exports = featuresModel;
