
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
                height_cms={dog.height_cms}
                weight_kg = {dog.weight_kg}
                temperament = {dog.temperament}
                lifeSpan={dog.lifeSpan}
                />
 
            })}
        </div>
    )
}; 

export default CardsContainer; 
