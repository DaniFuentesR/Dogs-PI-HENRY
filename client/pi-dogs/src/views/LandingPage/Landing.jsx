import style from "./Landing.module.css"
import { Link } from "react-router-dom"

const Landing = () => {

    return (

        <div className={style.landingPage}>
            <div className={style.frame}>
                <h1>Bienvenidos al Proyecto Individual de Dogs</h1>
                <p>Hecho por Daniel Fuentes</p>
                <Link to="/home"><button className="btn">Ver perros</button></Link>
        </div>
      </div>
    );
  };

export default Landing; 