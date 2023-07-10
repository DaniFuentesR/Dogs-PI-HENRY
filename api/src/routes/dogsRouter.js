const {Router} = require ("express"); 
const {getDogsHandler, getDogByIdHandler, createDogHandler, dogToDeleteHandler} = require ("../handlers/dogsHandlers"); 
const dogsRouter = Router(); 

dogsRouter.get("/", getDogsHandler); 

dogsRouter.get("/:id", getDogByIdHandler); 

dogsRouter.post ("/", createDogHandler); 

dogsRouter.delete("/:id/delete", dogToDeleteHandler)

module.exports= dogsRouter; 