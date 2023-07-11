import CardsContainer from "../../Components/CardsContainer/CardsContainer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, filterByTemperament, filteredByCreation, clearFilters, orderByName, orderByWeight} from "../../Redux/actions";
import style from "./Home.module.css"



const Home = () => {

    const dispatch = useDispatch(); 
    const dogs = useSelector(state => state.dogs) 
    const dogsFiltered = useSelector((state) => state.dogsFiltered);
    const filter = useSelector ((state)=>state.filter)
    const [temperaments, setTemperaments] = useState(""); 
    const [filterType, setFilterType] = useState(""); 
    const [orden, setOrden] = useState("")


    // ORDENAMIENTO /> 

    const handleSort = (event) => {

        const value = event.target.value

        event.preventDefault(); 
        dispatch(orderByName(value))
        setOrden(`Orden ${value}`)
    }

    const handleSorted = (event) => {

        const value = event.target.value

        event.preventDefault(); 
        dispatch(orderByWeight(value))
        setOrden(`Orden ${value}`)
    }



    // ORDENAMIENTO </ 
    

    
    //PAGINADO />

    const ITEMS_PER_PAGE = 8
     
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

        if (filter) {
            
            if(firstIndex >= dogsFiltered.length) return; 
            setItemsFiltered([...dogsFiltered].splice(firstIndex,ITEMS_PER_PAGE));
            setCurrentPage(next_page);
        }
            
            if (firstIndex >= dogs.length) return;
            setItems([...dogs].splice(firstIndex, ITEMS_PER_PAGE));
            setCurrentPage(next_page); 

    };


    const prevPage = () => {
        
        const prev_page = currentPage - 1; 
        const firstIndex = prev_page * ITEMS_PER_PAGE; 

        if(filter){
            if(prev_page < 0) return; 
            setItemsFiltered([...dogsFiltered].splice(firstIndex, ITEMS_PER_PAGE));
            setCurrentPage(prev_page); 

        }

            if (prev_page < 0) return; 
            setItems([...dogs].splice(firstIndex, ITEMS_PER_PAGE))
            setCurrentPage(prev_page)
    }
    
    //PAGINADO </

    

    // FILTROS />

    const filtersTemperament = () => {

        if(temperaments.trim() !== "")
        dispatch(filterByTemperament(temperaments.split(" ")))
        setFilterType(`Filtrado por temperamentos: ${temperaments}`); 
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
        setFilterType(created ? "Filtrado por Creados" : "Filtrado por Antiguos")
    }; 

    const resetFilter = () => {
        dispatch (clearFilters()); 
        setCurrentPage(0); 
        setItems([...dogs].splice(0, ITEMS_PER_PAGE)); 
        setItemsFiltered([...dogsFiltered].splice(0, ITEMS_PER_PAGE)); 
        setFilterType(""); 
        setTemperaments(""); 
    }


    const isFilterButtonDisabled = temperaments.trim() === '';

    //FILTROS </

    

    useEffect(()=>{
        dispatch(getDogs()); 
    },[dispatch]); 

    return (
        <>
       
        
        <h1>All DOGS AT HOME</h1>
        <div className={style.filtersContainer}>
            
            <button onClick={filtersTemperament} disabled={isFilterButtonDisabled}> Filtrar Temperamentos </button>

            <input type="text" value={temperaments} onChange={temperamentHandler} placeholder="Temperament" onKeyDown={handleKeyDown}/>

            <button onClick={()=>filtersCreated(true)}> Filtrar por creados </button>

            <button onClick={()=>filtersCreated(false)}> Filtrar por antiguos </button>

            <button onClick={resetFilter}>Order</button>
                {filterType && <p>{filterType}</p>}

            <select onChange={handleSort}>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>
            <select onChange={handleSorted}>
                <option value="maxW">Menor peso</option>
                <option value="minW">Mayor Peso</option>
            </select>
        </div>

            <CardsContainer dogs={filter ? itemsFiltered : item} />

            <button onClick={()=>prevPage()} className={style.buttonPrev}>PREV PAGE</button> <button className={style.buttonNext} onClick={()=>nextPage()}>NEXT PAGE</button>
    
        </>
    )
}; 



export default Home; 