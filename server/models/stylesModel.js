const mod = require('./index');

const stylesModel = (sequelize, { DataTypes }) => {
  const Styles = sequelize.define('styles', {
    style_id: {
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sale_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    original_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    'default?': {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Styles.associate = (models) => {
    Styles.hasMany(models.Photos, { onDelete: 'CASCADE', foreignKey: 'style_id' });
    Styles.hasMany(models.Skus, { onDelete: 'CASCADE', foreignKey: 'style_id' });
  };

  Styles.getStylesByProductId = async (productId) => {
    const dbStyles = await Styles.findAll({
      where: { product_id: productId },
      include: [{
        model: mod.models.Photos,
        attributes: { exclude: ['id', 'style_id', 'createdAt', 'updatedAt'] },
      },
      {
        model: mod.models.Skus,
        attributes: { exclude: ['createdAt', 'updatedAt', 'style_id'] },
      }],
      attributes: { exclude: ['createdAt', 'updatedAt', 'product_id'] },
    });

    const convert = (skusArr) => {
      const skusObj = {};
      skusArr.forEach((sku) => {
        skusObj[sku.id] = { size: sku.size, quantity: sku.quantity };
      });
      return skusObj;
    };

    dbStyles.forEach((style) => {
      // eslint-disable-next-line no-param-reassign
      style.dataValues.skus = convert(style.skus);
    });
    return dbStyles;
  };

  return Styles;
};

module.exports = stylesModel;
