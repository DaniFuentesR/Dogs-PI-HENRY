import {Link} from "react-router-dom";  
import style from "./NavBar.module.css"
import { useDispatch } from "react-redux";
import { clearFilters } from "../../Redux/actions";
import SearchBar from "../SearchBar/SearchBar";

const  NavBar = ({onSearch}) => {

    const dispatch = useDispatch(); 

    const clearFiltersHandler = () => {
        dispatch(clearFilters()); 
    }

    return (
        <div className={style.mainContainer}>

            
            <div className={style.NavBarLeft}>
                <Link to= "/home" className={`${style.NoUnderline}`} onClick={clearFiltersHandler}>HOME</Link>

                <Link to= "/create" className={`${style.NoUnderline} ${style.FormButton}`}>CREATE DOG</Link>
            </div>

            <div className={style.NavBarRight}>
                <SearchBar onSearch={onSearch}/>
            </div>
        </div>

    )
}; 

export default NavBar; 