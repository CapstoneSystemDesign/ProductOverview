const skusModel = (sequelize, { DataTypes }) => {
  const Skus = sequelize.define('skus', {
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
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Skus.associate = (models) => {
    Skus.belongsTo(models.Styles, { foreignKey: 'style_id' });
  };

  return Skus;
};

module.exports = skusModel;
