const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
  sequelize.define('Videogame', {
      ID: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
      },
      Nombre: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      Descripcion: {
        type: DataTypes.TEXT,
      },
      Plataformas: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Imagen: {
        type: DataTypes.STRING,
      },
      FechaLanzamiento: {
        type: DataTypes.DATE,
      },
      Rating: {
        type: DataTypes.FLOAT,
      },
    },
    {
      timestamps: false,
    }
  );
};


