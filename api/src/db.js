const { Sequelize } = require('sequelize');
require('dotenv').config();
const {DB_USER, DB_PASSWORD, DB_HOST} = process.env;
const DogsModel = require ("./models/DogsModel"); 
const TemperamentModel = require ("./models/TempModel"); 

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

DogsModel (sequelize); 
TemperamentModel (sequelize); 

const {Dog, Temperament} = sequelize.models; 

Dog.belongsToMany(Temperament, {through: "Dog_Temperament"}); 
Temperament.belongsToMany(Dog, {through: "Dog_Temperament"}); 




module.exports = {sequelize, ...sequelize.models}; 
