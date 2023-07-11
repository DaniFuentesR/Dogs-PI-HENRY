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
        height_min_cms: parseInt(elem.height.metric.split("-")[0]),
        height_max_cms: parseInt(elem.height.metric.split("-")[1]),
        weight_min_kg: parseInt(elem.weight.metric.split("-")[0]),
        weight_max_kg: parseInt(elem.weight.metric.split("-")[1]),
        lifeSpan: elem.life_span, 
        created: false, 
        temperament: elem.temperament? elem.temperament.split(", ").join(", "):["No tiene temperamento"],
    }
    
    
})


        
const getAllDogs = async () => {
    
    const dataBaseDogs = await Dog.findAll({include: {
        model: Temperament, 
        attributes: ["name"],
        through: {attributes: []},
    }}); 

        let response = await dataBaseDogs.map(dog => {
        return {
            id: dog.id,
            name: dog.name,
            image: dog.image,
            height_min_cms: dog.height_min_cms,
            height_max_cms: dog.height_max_cms,
            weight_min_kg: dog.weight_min_kg,
            weight_max_kg: dog.weight_max_kg,
            lifeSpan: dog.lifeSpan,
            temperament: dog.Temperaments? dog.Temperaments.map((temperament=>temperament.name)).join(", "): "",
            created: dog.created
      }
    })

    
    const url = "https://api.thedogapi.com/v1/breeds"; 
    const requestUrl = `${url}?api_key=${API_KEY}`; 
    
    const apiDogsRaw = (await axios.get(requestUrl)).data; 
    
    const apiDogsClean = cleanArrayDogs (apiDogsRaw); 
    

    return [...response, ...apiDogsClean]; 
}; 
    
    
const getDogById = async (id, source) => {
    
    const cleanArrayDogsById = (arr) => 

        arr.map ((elem) => {
            return {
                id: elem.id,
                name: elem.name, 
                image: `https://cdn2.thedogapi.com/images/${elem.reference_image_id}.jpg`,
                height_min_cms: parseInt(elem.height.metric.split("-")[0]),
                height_max_cms: parseInt(elem.height.metric.split("-")[1]),
                weight_min_kg: parseInt(elem.weight.metric.split("-")[0]),
                weight_max_kg: parseInt(elem.weight.metric.split("-")[1]),
                lifeSpan: elem.life_span, 
                created: false, 
                temperament: elem.temperament? elem.temperament.split(", ").join(", "):["No tiene temperamento"],
    }
    
    
})  
    
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
        
    
        return dataDogsClean; 
}




const getDogByName = async (name) => {

    const dataBaseDogs = await Dog.findAll(
        
        { 
            where:{
            
                [Op.or]: [{name: {[Op.iLike]:`%${name}%`}}]                   
            },

            include: {
                model: Temperament, 
                attributes: ["name"],
                through: {attributes: []},
    }}); 

    let response = await dataBaseDogs.map(dog => {
        return {
            id: dog.id,
            name: dog.name,
            image: dog.image,
            height_min_cms: dog.height_min_cms,
            height_max_cms: dog.height_max_cms,
            weight_min_kg: dog.weight_min_kg,
            weight_max_kg: dog.weight_max_kg,
            lifeSpan: dog.lifeSpan,
            temperament: dog.Temperaments? dog.Temperaments.map((temperament=>temperament.name)).join(", "): "",
            created: dog.created
      }
    })

            
    
    const url = "https://api.thedogapi.com/v1/breeds"
    const requestUrl = `${url}?api_key=${API_KEY}`
    const apiDogsRaw = (await axios.get(requestUrl)).data; 

    const apiDogs = cleanArrayDogs(apiDogsRaw); 
    const regex = new RegExp(name, "i"); 

    const filteredApi = apiDogs.filter((dog)=> regex.test(dog.name)); 

    return [...response, ...filteredApi]
}




const createDog = async (name, image, height_min_cms, height_max_cms, weight_min_kg, weight_max_kg, lifeSpan) => {
    
      const newDog = await Dog.create({
        name,
        image,
        height_min_cms,
        height_max_cms,
        weight_min_kg,
        weight_max_kg,
        lifeSpan,
      });

      return newDog; 

  
    
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