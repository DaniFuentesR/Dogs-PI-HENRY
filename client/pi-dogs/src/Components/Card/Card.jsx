
import style from "./Card.module.css"; 
import {Link} from "react-router-dom"; 


const Cards = ({id, name, weight_kg, height_cms, image, temperament, lifeSpan }) => {

    const dogData = {id, name, weight_kg, height_cms, image, temperament, lifeSpan }

    return (

        
        <div className={style.Card}>

            <Link to={{pathname: "/detail", state:{dogData}}} className={style.NoUnderline}><p>{name}</p></Link>
            <Link to={{pathname: "/detail", state:{dogData}}}><img className={style.Card} src={image} alt=""/></Link>
            <p>Weight in kg: {weight_kg}</p>
            <p>Temperament: {temperament}</p>
         
        
        </div>
    )
}; 

export default Cards;