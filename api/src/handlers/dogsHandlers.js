const {getDogByName, getAllDogs, getDogById, createDog, deleteDog} = require ("../controllers/dogsControllers"); 


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

    const {id, name, image, height_cms, weight_kg, lifeSpan} = req.body; 

    try {
        const newDog = await createDog(id, name, image, height_cms, weight_kg, lifeSpan);
        res.status(201).json(newDog); 
    } catch (error) {
        res.status(400).json({error: error.message})
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
