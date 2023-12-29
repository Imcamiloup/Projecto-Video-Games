const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
  sequelize.define('Videogame', {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
      },
      plataformas: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      imagen: {
        type: DataTypes.STRING,
      },
      fechaLanzamiento: {
        type: DataTypes.DATEONLY,
      },
      rating: {
        type: DataTypes.FLOAT,
      },
    },
    {
      paranoid: true,
      tableName: 'Videogame', 
      timestamps: false,
      freezeTableName: false, 
    }
  );
};



