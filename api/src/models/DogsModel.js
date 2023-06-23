const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Dog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true, 
      defaultValue: DataTypes.UUIDV4
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING, 
      allowNull: false
    }, 

    height: {
      type: DataTypes.STRING,
      allowNull: false
    }, 

    weight: {
      type: DataTypes.STRING,
      allowNull: false, 
    },

    lifeSpan: {
      type: DataTypes.STRING,
      allowNull: false, 
    }, 

    created: {
      type: DataTypes.BOOLEAN, 
      defaultValue: true
    }
  },
    {timestamps: false}  
  );
};
