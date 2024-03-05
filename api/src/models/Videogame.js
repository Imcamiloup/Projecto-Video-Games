const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      platforms: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
      released: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.FLOAT,
      },
    },
    {
      timestamps: true,
    }
  );
};



