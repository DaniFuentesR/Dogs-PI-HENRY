import style from "./Card.module.css"; 
import {Link} from "react-router-dom"; 


const Cards = (props) => {
    return (

        
        <div className={style.Card}>

            <Link to="/detail" className={style.NoUnderline}><p>{props.name}</p></Link>
            <Link to="/detail"><img className={style.Card} src={props.image} alt=""/></Link>
            <p>Weight in kg: {props.weight_kg}</p>
            <p>Temperament: {props.temperament}</p>
          
         
        
        </div>
    )
}; 

export default Cards; 