import { useState } from "react";
import style from "./Form.module.css"

const Form = () => {

    const [form, setForm] = useState({
        name: "",
        height: "", 
        weight: "", 
        lifeSpan: "", 
        temperament: "", 
    }); 

    const changeHandler = (event) => {
        const property = event.target.name; 
        const value = event.target.value

        setForm({...form, [property]:value}) // setForm me permite modificar el estado, aca hago una copia del estado en este caso form, al cual quiero modificarle la propiedad que quiero modificar (property) y a esa property quiero darle el valor (value)
        }; 


    const submitHandler = (event) => { // esto es para que no se me recargue la pagina cada vez que creo un perro al darle al boton create breed
        event.preventDefault()
    }

    return (
        <form onSubmit={submitHandler} className={style.Form}>

            <div>
                <label>Name </label>
                <input type="text" value={form.name} onChange={changeHandler} name="name"/>

            </div>

            <div>

                <label>Height </label>
                <input type="number" value={form.height} onChange={changeHandler} name="height"/>

            </div>

            <div>

                <label>Weight </label>
                <input type="number" value={form.weight} onChange={changeHandler} name="weight"/>

            </div>

            <div>

                <label>LifeSpan </label>
                <input type="text" value={form.lifeSpan} onChange={changeHandler} name="lifeSpan"/>

            </div>

            <div>

                <label>Temperament </label>
                <input type="text" value={form.temperament} onChange={changeHandler} name="temperament"/>

            </div>

            <div>
                <button type="sumbit">Create Breed</button>
            </div>
        </form>
    )
}; 

export default Form; 