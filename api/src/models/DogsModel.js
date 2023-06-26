const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Dog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true, 
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING, 
      allowNull: false
    }, 

    height_cms: {
      type: DataTypes.STRING,
      allowNull: false
    }, 

    weight_kg: {
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
