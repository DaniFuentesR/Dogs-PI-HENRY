
import Card from "../Card/Card"; 
import style from "./CardsContainer.module.css"




const CardsContainer = ({dogs}) => {

    
    return (
        <div className={style.Container}>

            {dogs.map((dog)=>{

                return <Card
        
                name = {dog.name}
                image= {dog.image}
                weight_kg = {dog.weight_kg}
                temperament = {dog.temperament}
                />
 
            })}
        </div>
    )
}; 
 export default CardsContainer; 
