import {Link} from "react-router-dom";  
import style from "./NavBar.module.css"
import { useDispatch } from "react-redux";
import SearchBar from "../SearchBar/SearchBar"; 
import { useSelector } from "react-redux"

import { searchDog, clearFilters } from "../../Redux/actions";



const  NavBar = () => {
    
    // const searchResults = useSelector((state) => state.searchResults); 
 

    const dispatch = useDispatch(); 

    const clearFiltersHandler = () => {
        dispatch(clearFilters()); 
        dispatch(searchDog("")); 
    }

    return (
        <div className={style.mainContainer}>

            
            <div className={style.NavBarLeft}>
                <Link to= "/home" className={`${style.NoUnderline}`} onClick={clearFiltersHandler} >HOME</Link>
                
                <Link to= "/create" className={`${style.NoUnderline} ${style.FormButton}`}>CREATE DOG</Link>
            </div>

            <div className={style.NavBarRight}>
                <SearchBar/>
            </div>
        </div>

    )
}; 

export default NavBar; 