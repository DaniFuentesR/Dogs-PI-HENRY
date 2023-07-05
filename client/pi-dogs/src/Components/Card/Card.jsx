
import style from "./Card.module.css"; 
import {Link} from "react-router-dom"; 


const Cards = ({ id, name, weight_min_kg, weight_max_kg, height_min_cms, height_max_cms, image, temperament, lifeSpan }) => {

    const dogData = { id, name, weight_min_kg, weight_max_kg, height_min_cms, height_max_cms, image, temperament, lifeSpan }

    return (

        
        <div className={style.Card}>

            <Link to={{pathname: "/detail", state:{dogData}}} className={style.NoUnderline}><p>{name}</p></Link>
            <Link to={{pathname: "/detail", state:{dogData}}}><img className={style.Card} src={image} alt=""/></Link>
            <p>Weight Min: {weight_min_kg} Kg</p>
            <p>Weight Max: {weight_max_kg} Kg</p>
            <p>Temperament: {temperament}</p>
         
        
        </div>
    )
}; 

export default Cards;