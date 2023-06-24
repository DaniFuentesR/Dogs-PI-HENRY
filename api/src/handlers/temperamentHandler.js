const getTemperamentsFromDb = require ("../controllers/temperamController"); 

const getTemperamentHandler = async (req, res) => {

    try {
        const allTemperaments = await getTemperamentsFromDb();   
        res.status(200).json(allTemperaments)       
    } catch (error) {
        res.status(400).json({error: error.message}); 
    }
}; 

module.exports = getTemperamentHandler; 