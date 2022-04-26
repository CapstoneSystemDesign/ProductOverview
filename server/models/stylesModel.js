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
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  // Styles.associate = (models) => {
  //   Styles.belongsTo(models.Product);
  // };

  Styles.getStylesByProductId = async (productId) => {
    const styles = await Styles.findAll({
      where: { product_id: productId },
      attributes: { exclude: ['createdAt', 'updatedAt', 'product_id'] }, // also, can use "include: ['...']"
    });
    // console.log('styles, in models: ', styles);
    return styles;
  };

  return Styles;
};

// export default stylesModel;
module.exports = stylesModel;

/*
 * nesting await in for loop...
 */
// Styles.getStylesByProductId = async (productId) => {
//   const dbStyles = await Styles.findAll({
//     where: { product_id: productId },
//     attributes: { exclude: ['createdAt', 'updatedAt', 'product_id'] },
//   });
//   for (let i = 0; i < dbStyles.length; i += 1) {
//     dbStyles[i].photos = await photosModel.Photos.findById({
//       where: { style_id: dbStyles[i].style_id },
//       attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'style_id'] },
//     });
//   }
//   // console.log('styles, in models: ', styles);
//   return dbStyles;
// };
/*
*
*/
