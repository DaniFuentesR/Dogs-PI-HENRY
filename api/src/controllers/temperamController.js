const axios = require ("axios"); 
const {Temperament} = require ("../db"); 

const getTemperaments = async () => {

    const allTemperaments = []; 

    const response = await axios.get("https://api.thedogapi.com/v1/breeds");
    const url = response.data

    url.map ((dog) => {
        
        let infoDogs = {

            id: dog.id,
            name: dog.temperament
        }
        allTemperaments.push(infoDogs)
    })

        return[...new Set (allTemperaments)]; 
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
