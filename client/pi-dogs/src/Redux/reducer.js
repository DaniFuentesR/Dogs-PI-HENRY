import {GET_DOGS, FILTER_TEMPERAMENT, FILTER_CREATED, CLEAR_FILTERS, SEARCH_DOGS} from "./actions"; 

const initialState = {
    
    dogs:[],
    dogsFiltered: [],
    filter: false,
    temperaments: [],
    searchResults: [],


    
}; 


const filteredDogByCreation = (dogs, created) => {
    return dogs.filter((dog) => dog.created === created)
}

const rootReducer = (state = initialState, action) => {


    switch (action.type) {
        case GET_DOGS: 
         return {
            ...state, 
            dogs: action.payload
        }


        case FILTER_TEMPERAMENT:
            
        return {
            ...state,
            filter: true,
            dogsFiltered: [...state.dogs].filter((dog) => {
              if (dog.temperament && typeof dog.temperament === 'string') {
                return action.payload.every((temperament) =>
                  dog.temperament.toLowerCase().includes(temperament.toLowerCase())
                );
              }
              return false;
            }),
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

        case SEARCH_DOGS: 

            return {
                ...state,
                dogs: action.payload
            }

            
        


        default: 
            return {...state}; 
    }
};

export default rootReducer; 