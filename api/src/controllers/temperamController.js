const axios = require ("axios"); 
const {Temperament} = require ("../db"); 
const {API_KEY} = process.env; 


const getTemperaments = async () => {

    const url = "https://api.thedogapi.com/v1/breeds"; 
    const requestUrl = `${url}?api_key=${API_KEY}`; 
    
    const apiDogsRaw = (await axios.get(requestUrl)).data; 


    const infoDogs = apiDogsRaw.map ((dog) => dog.temperament); 
    

    const allTemperaments = infoDogs.join(", "); 

    
    const temperamentsFiltered = [...new Set (allTemperaments.split(", "))]; 


    const temperaments = temperamentsFiltered.map((temperament) => ({
 
        name: temperament
    })); 

    return [...new Set (temperaments)]; 
};






const getTemperamentsFromDb = async () => {

    const apiInfo = await getTemperaments(); 

    apiInfo.forEach((elem) => {
        Temperament.findOrCreate({where: elem}); 
    });

    const getAllTemperaments = await Temperament.findAll(); 
    return getAllTemperaments; 

 
}

module.exports = getTemperamentsFromDb; 
