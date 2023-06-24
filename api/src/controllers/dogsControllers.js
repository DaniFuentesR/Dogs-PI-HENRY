const axios = require ("axios"); 
const {Dog, Temperament} = require ("../db"); 
const {Op} = require ("sequelize"); 
const { name } = require("../app");


const cleanArrayDogs = (arr) => 

    arr.map ((elem) => {
        return {
            id: elem.id,
            name: elem.name, 
            image: elem.image?.url,
            height_cms: elem.height.metric,
            weight_kg: elem.weight.metric,
            lifeSpan: elem.life_span, 
            created: false, 
        }


    })
    
    
    const getAllDogs = async () => {
        
        const dataBaseDogs = await Dog.findAll(); 
        
        const apiDogsRaw = (await axios.get("https://api.thedogapi.com/v1/breeds")).data; 
        
        const apiDogsClean = cleanArrayDogs (apiDogsRaw); 
        
        return [...dataBaseDogs, ... apiDogsClean]; 
    }; 
    
    
    const getDogById = async (id, source) => {

        const cleanData = []; 
    
        const apiDataRaw = (await axios.get (`https://api.thedogapi.com/v1/breeds/${id}`)).data; 

        cleanData.push(apiDataRaw); 

        const dataDogsClean = source === "API" ? 
        await cleanArrayDogs(cleanData) : 
        await Dog.findByPk(id, {
            include: {
                model: Temperament, 
                attributes: [id, name]
            }
        })

        return [...dataDogsClean]; 
}; 

const getDogByName = async (name) => {

    const dataBaseDogs = await Dog.findAll(
        
        { 
            where:{
            
                [Op.or]: [{name: {[Op.iLike]:`%${name}$%`}}]                   
            }
        }); 

    const apiDogsRaw = (await axios.get("https://api.thedogapi.com/v1/breeds")).data; 
    const apiDogs = cleanArrayDogs(apiDogsRaw); 
    const regex = new RegExp(name, "i"); 

    const filteredApi = apiDogs.filter((dog)=> regex.test(dog.name)); 

    return [...dataBaseDogs, ...filteredApi]


}; 


const createDog = async (id, name, image, height_cms, weight_kg, lifeSpan) => await Dog.create({id, name, image, height_cms, weight_kg, lifeSpan})


const deleteDog = async (id) => {
    const dogToDelete = await Dog.findByPk(id);
    await dogToDelete.destroy(); 
    return dogToDelete; 
}


module.exports = {

    getAllDogs,
    getDogById,
    getDogByName,
    createDog,
    deleteDog
}