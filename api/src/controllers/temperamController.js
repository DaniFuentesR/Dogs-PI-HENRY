const axios = require ("axios"); 
const {Temperament} = require ("../db"); 


const getTemperaments = async () => {

    

    const response = await axios.get("https://api.thedogapi.com/v1/breeds");
    const url = response.data

    const infoDogs = url.map ((dog) => dog.temperament); 
    

    const allTemperaments = infoDogs.join(", "); 

    
    const temperamentsFiltered = [...new Set (allTemperaments.split(", "))]; 


    const temperaments = temperamentsFiltered.map((temperament, index) => ({

        id: index + 1, 
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
