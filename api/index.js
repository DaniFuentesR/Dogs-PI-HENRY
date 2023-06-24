const server = require('./src/app.js');
const {sequelize} = require ("./src/db.js"); 
const PORT = 3005

server.listen (PORT, ()=>{
  sequelize.sync({alter: true});
  console.log(`listen at ${PORT}`);
}); 