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

  Photos.associate = (models) => {
    Photos.belongsTo(models.Styles, { foreignKey: 'style_id' });
  };

  return Photos;
};

module.exports = photosModel;
