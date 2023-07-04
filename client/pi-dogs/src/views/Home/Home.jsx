import CardsContainer from "../../Components/CardsContainer/CardsContainer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, filterByTemperament, filteredByCreation, clearFilters } from "../../Redux/actions";
import style from "./Home.module.css"



const Home = () => {

    const dispatch = useDispatch(); 
    const dogs = useSelector(state => state.dogs) 
    const dogsFiltered = useSelector((state) => state.dogsFiltered);
    const filter = useSelector ((state)=>state.filter)
    const [temperaments, setTemperaments] = useState(""); 
    const [filterType, setFilterType] = useState(""); 
    const [orderOption, setOrderOption] = useState(""); 


    // ORDENAMIENTO /> 

    // const handlerOrder = (event) => {
    //     const {value} = event.target; 
    //     setOrderOption(value); 

    //     if(value === "weight") {
    //         if (filter) {
    //             const itemsOrdered = [...dogsFiltered].sort((a,b)=>b.weight_kg - a.weight_kg)
    //             setItemsFiltered(itemsOrdered)
    //         } else {
    //             const itemsOrdered = [...dogsFiltered].sort((a,b)=>b.weight_kg - a.weight_kg)
    //             setItems(itemsOrdered)
    //         }
    //     } else if (value === "name"){
    //         if (filter) {
    //             const itemsOrdered = 
    //             setItemsFiltered([...dogsFiltered].sort((a, b) => a.name.localeCompare(b.name)))
    //         } else {
    //             setItems([...dogs].sort((a,b)=>a.name.localeCompare(b.name)))
    //         }
    //     }
    // }; 








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
        
        <div>
            
            <button onClick={filtersTemperament} disabled={isFilterButtonDisabled}> Filtrar Temperamentos </button>

            <input type="text" value={temperaments} onChange={temperamentHandler} placeholder="Temperament" onKeyDown={handleKeyDown}/>

            <button onClick={()=>filtersCreated(true)}> Filtrar por creados </button>

            <button onClick={()=>filtersCreated(false)}> Filtrar por antiguos </button>

            <button onClick={resetFilter}>Limpiar Filtros</button>
                {filterType && <p>{filterType}</p>}

            <select value={orderOption}>

                <option value="">Ordenar por</option>
                <option value="weight">Peso</option>
                <option value="name">Nombre</option>

            </select>

        </div>

            <CardsContainer dogs={filter ? itemsFiltered : item} />

            <button onClick={()=>prevPage()} className={style.buttonPrev}>PREV PAGE</button> <button className={style.buttonNext} onClick={()=>nextPage()}>NEXT PAGE</button>
    
        </>
    )
}; 



export default Home; 