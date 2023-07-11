import axios from "axios"; 
export const GET_DOGS = "GET_DOGS"
export const GET_DOG_BY_ID = "GET_DOG_BY_ID"
export const FILTER_TEMPERAMENT = "FILTER_TEMPERAMENT"
export const FILTER_CREATED = "FILTER_CREATED"
export const CLEAR_FILTERS = "CLEAR_FILTERS"; 
export const SEARCH_DOGS = "SEARCH_DOGS"; 
export const ORDER_BY_NAME = "ORDER_BY_NAME"
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS"
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT"

export const getDogs = () => {

    return async function  (dispatch) {

        try {

        const apiData = await axios.get("http://localhost:3006/dogs/"); 
        const dogs = apiData.data; 

       return dispatch(
            {
             type: GET_DOGS, 
             payload: dogs
            }
        )
        } catch (error) {
            alert("No se encontraron perros")
        }

        
    };

}; 

export const searchDog = (name) => {
    return async function (dispatch) {

        try {
            const apiData = await axios.get(`http://localhost:3006/dogs/?name=${name}`);

            return dispatch({
                type: SEARCH_DOGS,
                payload: apiData.data
            })
        } catch (error) {
            alert("No hay perros con ese nombre")
        }
       
    }
}



export const filterByTemperament = (temperament) => {

    return async function  (dispatch) {

        return dispatch(
            {
             type: FILTER_TEMPERAMENT, 
             payload: temperament
            }
        )
    };

}; 

export const filteredByCreation = (created) => {
    return async function (dispatch) {

        return dispatch ({
            type: FILTER_CREATED,
            payload: created
        })
    }
}



export const clearFilters = () => {
    return {
        type: CLEAR_FILTERS
    }
}

export const orderByName = (name) => {
    return async function (dispatch) {
        return dispatch ({

            type: ORDER_BY_NAME,
            payload: name 
        })
    }
}

export const orderByWeight = ( weight_max_kg) => {
    return async function (dispatch) {
        return dispatch ({
            type: ORDER_BY_WEIGHT, 
            payload: weight_max_kg
        })
    }
}

export const postDog = (payload) => {
    return async function (dispatch) {
        
    
        const apiData = await axios.post("http://localhost:3006/dogs/", payload); 
        return apiData; 
        

    }    
}


export const getTemperaments = () => {

    return async function  (dispatch) {

        try {

        const apiData = await axios.get("http://localhost:3006/temperament/"); 
        const dogs = apiData.data; 

        return dispatch(
            {
             type: GET_TEMPERAMENTS, 
             payload: dogs
            }
        )
        } catch (error) {
            alert("No se encontraron temperamentos")
        }

        
    };

}; 

