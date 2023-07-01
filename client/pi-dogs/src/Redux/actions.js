import axios from "axios"; 
export const GET_DOGS = "GET_DOGS"
export const GET_DOG_BY_ID = "GET_DOG_BY_ID"
export const FILTER_TEMPERAMENT = "FILTER_TEMPERAMENT"
export const FILTER_CREATED = "FILTER_CREATED"
export const CLEAR_FILTERS = "CLEAR_FILTERS"; 




export const getDogs = () => {

    return async function  (dispatch) {

        const apiData = await axios.get("http://localhost:3005/dogs/"); 
        const dogs = apiData.data; 

        dispatch(
            {
             type: GET_DOGS, 
             payload: dogs
            }
        )
    };

}; 

export const getDogsById = (id) => {

    
    return async function (dispatch) {
        
        
        const apiData = await axios.get(`http://localhost:3005/dogs/${id}`)
        const dogsById = apiData.data;

        dispatch (
            {
                type: GET_DOG_BY_ID,
                payload: dogsById
            }
        )
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




export const ordernamiento = (order) => {

}; 
