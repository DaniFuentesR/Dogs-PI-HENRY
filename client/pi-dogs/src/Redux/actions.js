import axios from "axios"; 
export const GET_DOGS = "GET_DOGS"
export const GET_DOG_BY_ID = "GET_DOG_BY_ID"
export const FILTER_TEMPERAMENT = "FILTER_TEMPERAMENT"
export const FILTER_CREATED = "FILTER_CREATED"
export const CLEAR_FILTERS = "CLEAR_FILTERS"; 
export const SEARCH_DOGS = "SEARCH_DOGS"; 
export const POST_DOG = "POST_DOG"; 
export const SORT_BREEDS_BY_NAME_ASC = 'SORT_BREEDS_BY_NAME_ASC';
export const SORT_BREEDS_BY_NAME_DESC = 'SORT_BREEDS_BY_NAME_DESC';
export const SORT_BREEDS_BY_WEIGHT_ASC = 'SORT_BREEDS_BY_WEIGHT_ASC';
export const SORT_BREEDS_BY_WEIGHT_DESC = 'SORT_BREEDS_BY_WEIGHT_DESC';


export const getDogs = () => {

    return async function  (dispatch) {

        try {

        const apiData = await axios.get("http://localhost:3005/dogs/"); 
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
            const apiData = await axios.get(`http://localhost:3005/dogs/?name=${name}`);

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


export const postDog = (info) => {
    return async function (dispatch) {
        try {
            await axios.post("http://localhost:3005/dogs/", info)
            alert("Usuario creado con éxito")
            dispatch({
                type: POST_DOG,
                payload: ""
        })
        } catch (error) {
            alert(error.response.data.error)
        }
        
    }
}



export const sortBreedsByNameAsc = () => {
    return (dispatch) => {
      dispatch({ 
        type: SORT_BREEDS_BY_NAME_ASC });
    };
  };
  
  export const sortBreedsByNameDesc = () => {
    return (dispatch) => {
      dispatch({ 
        type: SORT_BREEDS_BY_NAME_DESC });
    };
  };
  
  export const sortBreedsByWeightAsc = () => {
    return (dispatch) => {
      dispatch({ 
        type: SORT_BREEDS_BY_WEIGHT_ASC });
    };
  };
  
  export const sortBreedsByWeightDesc = () => {
    return (dispatch) => {
      dispatch({ 
        type: SORT_BREEDS_BY_WEIGHT_DESC });
    };
  };
