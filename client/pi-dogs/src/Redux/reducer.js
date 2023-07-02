import {GET_DOGS, GET_DOG_BY_ID, FILTER_TEMPERAMENT, FILTER_CREATED, CLEAR_FILTERS} from "./actions"; 

const initialState = {
    
    dogs:[],
    dogsFiltered: [],
    filter: false,
    temperaments: []
}; 


const filteredDogByCreation = (dogs, created) => {
    return dogs.filter((dog) => dog.created === created)
}

const rootReducer = (state = initialState, action) => {


    switch (action.type) {
        case GET_DOGS: 
         return {...state, dogs: action.payload}

        case GET_DOG_BY_ID:
         return {...state, dogs: action.payload}; 


        case FILTER_TEMPERAMENT:
            return {
                ...state,
                filter: true,
                dogsFiltered: [...state.dogs].filter((dog) => action.payload.every((temperament)=> dog.temperament && dog.temperament.toLowerCase().includes(temperament.toLowerCase()))
            ),
        };

        case FILTER_CREATED:
            return {
                ...state,
                filter: true,
                dogsFiltered: filteredDogByCreation ([...state.dogs], action.payload)
            }

        case CLEAR_FILTERS:
            return{
                ...state,
                filter: false,
                dogsFiltered: [],
                temperaments: [], 
            }



        default: 
            return {...state}; 
    }
};

export default rootReducer; 