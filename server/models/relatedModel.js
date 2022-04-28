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
  }, { freezeTableName: true });

  Related.allRelatedProducts = async (productId) => {
    const relProducts = await Related.findAll({
      where: { product_id: productId },
      attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'product_id'] },
    });
    const convert = (arr) => {
      arr.forEach((elem, i) => {
        // eslint-disable-next-line no-param-reassign
        arr[i] = (elem.related_product_id);
      });
      return arr;
    };
    return convert(relProducts);
  };

  return Related;
};

module.exports = relatedModel;
