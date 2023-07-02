
  import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import style from "./Detail.module.css"
 
 
  






const Detail = () => {

    const location = useLocation(); 
    const {dogData} = location.state
    const { id, name, weight_kg, height_cms, image, temperament, lifeSpan } = dogData;
    const history = useHistory(); 

    const goBack = () => {
        if(location.state.from) {
            history.push(location.state.from)
        } else {
            history.goBack(); 
        }
    }; 



    return (
        <div className={style.Detail}>
        

      <p>ID: {id}</p>
        <h2>{name}</h2>
      <img src={image} alt={name} />
      <p>Height in cms: {height_cms}</p>
      <p>Weight in kg: {weight_kg} kg</p>
      <p>Temperament: {temperament}</p>
      <p>Lifespan: {lifeSpan}</p>
      <button onClick={goBack}>Volver</button>
        
        </div>
    )
}; 

export default Detail; 