const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
    sequelize.define('Genre', {
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
      
    },
    {
      tableName: 'Genre', 
      timestamps: false,
      freezeTableName: true, 
    }
    );
    
  };