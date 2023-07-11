
  import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import style from "./Detail.module.css"
 
 
  






const Detail = () => {

    const location = useLocation(); 
    const {dogData} = location.state
    const { id, name, weight_min_kg, weight_max_kg, height_min_cms, height_max_cms, image, temperament, lifeSpan } = dogData;
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
      <p>Height Min: {height_min_cms} cms</p>
      <p>Height Max: {height_max_cms} cms</p>
      <p>Weight Min kg: {weight_min_kg} kg</p>
      <p>Weight Max kg: {weight_max_kg} kg</p>
      <p>Temperament: {temperament}</p>
      <p>Lifespan: {lifeSpan} years</p>
      <button onClick={goBack}>Volver</button>
        
        </div>
    )
}; 

export default Detail; 