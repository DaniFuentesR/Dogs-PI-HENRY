import {GET_DOGS, FILTER_TEMPERAMENT, FILTER_CREATED, CLEAR_FILTERS, SEARCH_DOGS, SORT_BREEDS_BY_NAME_ASC, SORT_BREEDS_BY_NAME_DESC,SORT_BREEDS_BY_WEIGHT_ASC, SORT_BREEDS_BY_WEIGHT_DESC} from "./actions"; 

const initialState = {
    
    dogs:[],
    dogsFiltered: [],
    filter: false,
    temperaments: [],
    searchResults: [],
    orderOption: ""

    
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

        case SEARCH_DOGS: 

            return {
                ...state,
                dogs: action.payload
            }

            case SORT_BREEDS_BY_NAME_ASC:
                return {
                  ...state,
                  dogs: state.dogs.slice().sort((a, b) => a.name.localeCompare(b.name)),
                  orderOption: 'name_asc',
                };
          
              case SORT_BREEDS_BY_NAME_DESC:
                return {
                  ...state,
                  dogs: state.dogs.slice().sort((a, b) => b.name.localeCompare(a.name)),
                  orderOption: 'name_desc',
                };
          
              case SORT_BREEDS_BY_WEIGHT_ASC:
                return {
                  ...state,
                  dogs: state.dogs.slice().sort((a, b) => a.weight - b.weight),
                  orderOption: 'weight_asc',
                };
          
              case SORT_BREEDS_BY_WEIGHT_DESC:
                return {
                  ...state,
                  dogs: state.dogs.slice().sort((a, b) => b.weight - a.weight),
                  orderOption: 'weight_desc',
                };
        


        default: 
            return {...state}; 
    }
};

export default rootReducer; 