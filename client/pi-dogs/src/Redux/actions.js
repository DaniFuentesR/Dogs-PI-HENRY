import axios from "axios"; 
export const GET_DOGS = "GET_DOGS"
export const GET_DOG_BY_ID = "GET_DOG_BY_ID"
export const FILTER_TEMPERAMENT = "FILTER_TEMPERAMENT"
export const FILTER_CREATED = "FILTER_CREATED"
export const CLEAR_FILTERS = "CLEAR_FILTERS"; 
export const SEARCH_DOGS = "SEARCH_DOGS"; 


export const getDogs = () => {

    return async function  (dispatch) {

        try {

        const apiData = await axios.get("http://localhost:3006/dogs/"); 
        const dogs = apiData.data; 

        dispatch(
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

            dispatch({
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

        dispatch(
            {
             type: FILTER_TEMPERAMENT, 
             payload: temperament
            }
        )
    };

}; 

export const filteredByCreation = (created) => {
    return async function (dispatch) {

        dispatch ({
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

