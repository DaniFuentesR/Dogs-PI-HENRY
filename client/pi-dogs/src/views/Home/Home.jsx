import CardsContainer from "../../Components/CardsContainer/CardsContainer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, filterByTemperament, filteredByCreation } from "../../Redux/actions";



const Home = () => {

    const dispatch = useDispatch(); 

    const ITEMS_PER_PAGE = 8 

    const dogs = useSelector(state => state.dogs) 
    const dogsFiltered = useSelector((state) => state.dogsFiltered);
    const filter = useSelector ((state)=>state.filter)
    const [temperaments, setTemperaments] = useState(""); 

    //PAGINADO />
    const [currentPage, setCurrentPage] = useState(0); 
    const [item, setItems] = useState([...dogs].splice(0, ITEMS_PER_PAGE)); 
    const [itemsFiltered, setItemsFiltered] = useState([...dogsFiltered].splice(0, ITEMS_PER_PAGE)); 

    useEffect(()=>{
        setItems([...dogs].splice(0, ITEMS_PER_PAGE))
        setItemsFiltered([...dogsFiltered].splice(0, ITEMS_PER_PAGE))
    },[dogs, dogsFiltered]);


    const nextPage = () => {
        
        const next_page = currentPage + 1; 
        const firstIndex = next_page * ITEMS_PER_PAGE; 

        if(filter){
            if(firstIndex >= dogsFiltered.length) return; 
            setItemsFiltered([...dogsFiltered].splice(firstIndex,ITEMS_PER_PAGE));
            setCurrentPage(next_page);
        }
    };


    const prevPage = () => {
        
        const prev_page = currentPage - 1; 
        const firstIndex = prev_page * ITEMS_PER_PAGE; 

        if(filter){
            if(prev_page < 0) return; 
            setItemsFiltered([...dogsFiltered].splice(firstIndex, ITEMS_PER_PAGE));
            setCurrentPage(prev_page); 

        }


        setItems([...dogs].splice(firstIndex, ITEMS_PER_PAGE))
        setCurrentPage(prev_page)
    }
    
    //PAGINADO </


    // FILTROS />
    const filtersTemperament = () => {

        if(temperaments.trim() !== "")
        dispatch(filterByTemperament(temperaments.split(" ")))
    }

    const temperamentHandler = (event) => {
        const value = event.target.value; 
        setTemperaments(value);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") filtersTemperament()
    }; 

    const filtersCreated = (created) => {
        dispatch(filteredByCreation(created))
    }; 

    const isFilterButtonDisabled = temperaments.trim() === '';

    //FILTROS </


    

    useEffect(()=>{
        dispatch(getDogs()); 
    },[dispatch]); 

    return (
        <>
        <h1>All DOGS AT HOME</h1>
        
        
        <button onClick={filtersTemperament} disabled={isFilterButtonDisabled}> Filtrar Temperamentos </button>
        <input type="text" value={temperaments} onChange={temperamentHandler} placeholder="Temperament" onKeyDown={handleKeyDown}/>
        <button onClick={()=>filtersCreated(true)}> Filtrar por creados </button>
        <button onClick={()=>filtersCreated(false)}> Filtrar por antiguos </button>

            <CardsContainer dogs={filter ? itemsFiltered : item}/>

            <button onClick={()=>prevPage()}>PREV PAGE</button> <button onClick={()=>nextPage()}>NEXT PAGE</button>
    
        </>
    )
}; 



















// const Home = () => {

//     const dispatch = useDispatch(); 
//     const dogs = useSelector(state => state.dogs) 
//     const dogsFiltered = useSelector((state) => state.dogsFiltered);
//     const filter = useSelector ((state)=>state.filter)
//     const [temperament, setTemperament] = useState("")
//     const [created, setCreated] = useState(""); 

//     const filtersTemperament = () => {
//         dispatch(filterByTemperament(temperament))
//     }

//     const temperamentHandler = (event) => {
//         const value = event.target.value; 
//         setTemperament(value)
//     }

    

//     useEffect(()=>{
//         dispatch(getDogs()); 
//     },[dispatch]); 

//     return (
//         <>
//         <h1>All DOGS AT HOME</h1>
//         <input type="text" value={temperament} onChange={temperamentHandler} placeholder="Temperament"/>
//         <button onClick={filtersTemperament}> Filtrar Temperamentos </button>

//             <CardsContainer dogs={filter ? dogsFiltered : dogs}/>
    
//         </>
//     )
// }; 

export default Home; 