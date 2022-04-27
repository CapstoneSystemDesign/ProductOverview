const relatedModel = (sequelize, { DataTypes }) => {
  const Related = sequelize.define('related', {
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
    related_product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Related.findFeaturesByProductId = async (productId) => {
    const rel = await Related.findAll({
      where: { product_id: productId },
      attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'product_id'] },
    });
    return rel;
  };

  return Related;
};

module.exports = relatedModel;
