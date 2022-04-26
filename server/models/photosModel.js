// const featuresModel = require('./featuresModel'); // import more models

const photosModel = (sequelize, { DataTypes }) => {
  const Photos = sequelize.define('photos', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      validate: {
        notEmpty: true,
      },
    },
    style_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumbnail_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Photos.findById = async (styleId) => {
    const photos = await Photos.findAll({
      where: { style_id: styleId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    return photos;
  };

  return Photos;
};

// export default productsModel;
module.exports = photosModel;
