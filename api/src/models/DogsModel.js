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

    height_min_cms: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 

    height_max_cms: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 

    weight_min_kg: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 

    weight_max_kg: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 

    lifeSpan: {
      type: DataTypes.STRING,
      allowNull: false, 
    }, 
    
    created: {
      type: DataTypes.BOOLEAN, 
      defaultValue: true
    },
  },
    {timestamps: false}  
  );
};
