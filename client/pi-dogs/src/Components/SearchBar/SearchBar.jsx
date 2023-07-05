import style from "./searchBar.module.css"
import {useState} from "react"
import {useDispatch} from "react-redux"
import {searchDog} from "../../Redux/actions.js"



export default function SearchBar() {
   


   const [dogSearch, setDogSearch] = useState("")
   const dispatch = useDispatch(); 

   const handlerSearch = () => {
      dispatch(searchDog(dogSearch)); 
      
   
   }




   return (
      <div className={style.SearchBar}>
         <input type='search'  value={dogSearch} onChange={(e)=> setDogSearch(e.target.value)} placeholder="Inserte nombre"/>
        <button onClick={handlerSearch}>Buscar</button>
      </div>
   );
}
