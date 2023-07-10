const {getDogByName, getAllDogs, getDogById, createDog, deleteDog} = require ("../controllers/dogsControllers"); 
const {Temperament} = require ("../db"); 


const getDogsHandler = async (req, res) => {

    const {name} = req.query; 

    try {
        const results = name ? await getDogByName(name) : await getAllDogs(); 
        
        if (results.length == 0) {
            throw new Error ("Raza no existe")
        } else {
            res.status(200).json(results); 
        }

    } catch (error) {
        res.status(400).json({error: error.message}); 
    }
}; 


const getDogByIdHandler = async (req, res) => {

    const {id} = req.params;

    const source = isNaN(id) ? "BDD" : "API"

    try {
        const dogById = await getDogById(id, source); 
        res.status(200).json(dogById); 
    } catch (error) {
        res.status(400).json({error: error.message}); 
    }
}; 


const createDogHandler = async (req, res) => {
    const { name, image, height_min_cms, height_max_cms, weight_min_kg, weight_max_kg, lifeSpan, temperaments} = req.body;
  
    try {
      const newDog = await createDog(
        name,
        image,
        height_min_cms,
        height_max_cms,
        weight_min_kg,
        weight_max_kg,
        lifeSpan,
      );

      const temperamentBd = await Temperament.findAll({where: {name: temperaments}})
      await newDog.addTemperament(temperamentBd);
      res.status(201).json("Perro creado con éxito");
    } catch (error) {
      res.status(400).json({ error: "Error al crear el Perro" });
    }
  };

const dogToDeleteHandler = async (req, res) => {

    const {id} = req.params; 

    try {
        const deleted = await deleteDog(id); 
        res.status(200).json(deleted)
    } catch (error) {
        res.status(400).json({error: error.message}); 
    }
}

module.exports = {
    getDogsHandler,
    getDogByIdHandler,
    createDogHandler,
    dogToDeleteHandler
}
