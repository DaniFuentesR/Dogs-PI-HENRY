
import Card from "../Card/Card"; 
import style from "./CardsContainer.module.css"




const CardsContainer = ({dogs}) => {

    
    return (
        <div className={style.Container}>

            {dogs.map((dog)=>{

                return <Card
                
                key={dog.id}
                id={dog.id}
                name = {dog.name}
                image= {dog.image}
                height_min_cms= {dog.height_min_cms}
                height_max_cms = {dog.height_max_cms}
                weight_min_kg = {dog.weight_min_kg}
                weight_max_kg = {dog.weight_max_kg}
                temperament = {dog.temperament}
                lifeSpan={dog.lifeSpan}
                />
 
            })}
        </div>
    )
}; 

export default CardsContainer; 
