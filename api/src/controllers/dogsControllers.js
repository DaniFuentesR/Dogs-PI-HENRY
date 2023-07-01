const axios = require ("axios"); 
const {Dog, Temperament} = require ("../db"); 
const {Op} = require ("sequelize"); 
const {API_KEY} = process.env; 



const cleanArrayDogs = (arr) => 

arr.map ((elem) => {
    return {
        id: elem.id,
        name: elem.name, 
        image: elem.image.url,
        height_cms: elem.height.metric,
        weight_kg: elem.weight.metric,
        temperament: elem.temperament,
        lifeSpan: elem.life_span, 
        created: false, 
    }
    
    
})

        
const getAllDogs = async () => {
    
    const dataBaseDogs = await Dog.findAll({include: {
        model: Temperament, 
        attributes: ["name"],
        through: {attributes: []},
    }}); 
    
    const url = "https://api.thedogapi.com/v1/breeds"; 
    const requestUrl = `${url}?api_key=${API_KEY}`; 
    
    const apiDogsRaw = (await axios.get(requestUrl)).data; 
    
    const apiDogsClean = cleanArrayDogs (apiDogsRaw); 
    
        return [...dataBaseDogs, ... apiDogsClean]; 
    }; 
    
    
const getDogById = async (id, source) => {
    
        const cleanArrayDogsById = (arr) => 
    
        arr.map ((elem) => {
            return {
            id: elem.id,
            name: elem.name, 
            image: `https://api.thedogapi.com/v1/images/${elem.reference_image_id}`,
            height_cms: elem.height.metric,
            weight_kg: elem.weight.metric,
            lifeSpan: elem.life_span, 
            created: false, 
        };
    });     
    
        const cleanData = []; 
    
       const url = `https://api.thedogapi.com/v1/breeds/${id}`;
       const requestUrl= `${url}?api_key=${API_KEY}`; 
    
        const apiDataRaw = (await axios.get (requestUrl)).data; 
    
        cleanData.push(apiDataRaw); 
    
    
        const dataDogsClean = source === "API" ? 
    
        await cleanArrayDogsById(cleanData) : 
    
        await Dog.findByPk(id, {
            include: {
                model: Temperament, 
                attributes: ["name"],
                through: {attributes: []},
            }
        })
        
    
        return dataDogsClean
}




const getDogByName = async (name) => {

    const dataBaseDogs = await Dog.findAll(
        
        { 
            where:{
            
                [Op.or]: [{name: {[Op.iLike]:`%${name}$%`}}]                   
            }
        }); 
    
    const url = "https://api.thedogapi.com/v1/breeds"
    const requestUrl = `${url}?api_key=${API_KEY}`
    const apiDogsRaw = (await axios.get(requestUrl)).data; 

    const apiDogs = cleanArrayDogs(apiDogsRaw); 
    const regex = new RegExp(name, "i"); 

    const filteredApi = apiDogs.filter((dog)=> regex.test(dog.name)); 

    return [...dataBaseDogs, ...filteredApi]


}; 


const createDog = async (id, name, image, height_cms, weight_kg, lifeSpan) => {

    const newDog = await Dog.create({id, name, image, height_cms, weight_kg, lifeSpan});

    return newDog


}

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