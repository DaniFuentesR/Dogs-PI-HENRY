import { useState } from "react";
import style from "./searchBar.module.css"


export default function SearchBar({onSearch}) {

   let [name, setName] = useState (""); 

const handleChange = (event) => {
    const value = event.target.value; 
   setName (value)
}

   return (
      <div className={style.SearchBar}>
         <input type='search' value={name} onChange={handleChange}/>
         <button onClick={() => onSearch (name)}placeholder="Nombre Raza">Buscar</button> 
      </div>
   );
}
