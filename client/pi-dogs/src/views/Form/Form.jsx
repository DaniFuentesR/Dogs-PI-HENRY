import React, {useState, useEffect}from "react";
import {Link, useHistory} from "react-router-dom";
import { postDog, getTemperaments } from "../../Redux/actions";
import {useDispatch, useSelector} from "react-redux"; 
import style from "./Form.module.css"


const validate = (input) => {
    let errors = {};
    const nameRegex = /^[A-Za-z\s]+$/;

    if(!input.name) {
        errors.name = "Nombre Obligatorio"
    } else if (!nameRegex.test(input.name)) {
        errors.name = "Nombre deben ser únicamente letras"
    } else if (Number(!input.height_min_cms)) {
        errors.height_min_cms = "Altura mínima obligatoria"
    } else if (Number(!input.height_max_cms)) {
        errors.height_max_cms = "Altura máxima obligatoria"
    } else if (Number(input.height_max_cms) < Number(input.height_min_cms)) {
        errors.height_max_cms = "Altura máxima no puede ser menor a la altura mínima"
    } else if (Number(!input.weight_min_kg)) {
        errors.weight_min_kg = "Peso mínimo obligatorio"
    } else if (Number(!input.weight_max_kg)) {
        errors.weight_max_kg = "Peso máximo Obligatorio"
    } else if(Number(input.weight_max_kg) < Number(input.weight_min_kg)) {
        errors.weight_max_kg = "Peso máximo no puede ser menor al peso mínimo"
    } else if (Number(!input.lifeSpan)) {
        errors.lifeSpan = "Esperanza de vida Obligatoria"
    } else if (Number(input.lifeSpan) > 25) {
        errors.lifeSpan = "Ingrese una esperanza de vida válida"
    } else if (Number(input.height_min_cms) <= 0) {
        errors.height_min_cms = "La altura no puede ser menor o igual a cero"
    } else if (Number(input.weight_min_kg) <= 0) {
        errors.weight_min_kg = "El peso no puede ser menor o igual a cero"
    } else if (Number(input.lifeSpan) <= 0) {
        errors.lifeSpan = "La esperanza de vida no puede ser menor o igual a cero"
    } else if (input.temperaments.length === 0) {
        errors.temperaments = "Escoja al menos un temperamento"
    } else if (input.temperaments.some((temp) => input.temperaments.indexOf(temp) !== input.temperaments.lastIndexOf(temp))) {
        errors.temperaments = "No se puede seleccionar el mismo temperamento más de una vez"
    }

    return errors; 
}



const CreateDog  = () => {

    const dispatch = useDispatch(); 
    const temperaments = useSelector((state)=>state.temperaments); 
    const history = useHistory(); 
    const [errors, setErrors] = useState({})

      

    const [input, setInput] = useState({
        name: "",
        image: "",
        height_min_cms: "", 
        height_max_cms: "",
        weight_min_kg: "",
        weight_max_kg: "",  
        lifeSpan: "", 
        temperaments: [], 
    }); 




    const handleChange = (event) => {
        setInput ({
            ...input,
            [event.target.name] : event.target.value
        })

        setErrors (validate({
            ...input,
            [event.target.name]: event.target.value
        }))
    }

    const handleSelect = (event) => {
        setInput({
            ...input,
            temperaments: [...input.temperaments, event.target.value]
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault(); 
        dispatch(postDog(input)); 
        alert ("Perro creado con éxito"); 
        setInput({
        name: "",
        image: "",
        height_min_cms: "", 
        height_max_cms: "",
        weight_min_kg: "",
        weight_max_kg: "",  
        lifeSpan: "", 
        temperaments: [],
        }); 
        history.push("/home"); 
    }

    const disable = () => {
        return Object.keys(errors).length !== 0;
      };

    
        const handleDelete = (el) => {
        setInput({
            ...input,
            temperaments: input.temperaments.filter(temp => temp !== el)
        })
    }



    useEffect(()=> {
        dispatch(getTemperaments());
    }, [dispatch])

    useEffect(() => {
        setErrors(validate(input));
      }, [input]);
    
      useEffect(() => {
        setErrors(validate(input));
      }, []);

    return (
        <div className={style.Form}>
            

            <form onSubmit={(e)=>handleSubmit(e)}>
            <h1>Crear Perro</h1>
                <div>
                    <label>Name</label>
                    <input type="text" value={input.name} placeholder = {"Ingrese Nombre"} name="name" onChange={(e)=>handleChange(e) }/>
                    {errors.name && (<p>{errors.name}</p>)}
                </div>

                <div>
                    <label>Image</label>
                    <input type="text" placeholder = {"URL"} value={input.image} name="image" onChange={(e)=>handleChange(e)}/>
                </div>

                <div>
                    <label>Height Min</label>
                    <input type="number" value={input.height_min_cms} name="height_min_cms" placeholder = {"Ingrese altura min en cms"} onChange={(e)=>handleChange(e)}/>
                    {errors.height_min_cms && (<p>{errors.height_min_cms}</p>)}
                </div>

                <div>
                    <label>Height Max</label>
                    <input type="number" value={input.height_max_cms} name="height_max_cms" placeholder = {"Ingrese altura max en cms"} onChange={(e)=>handleChange(e)}/>
                    {errors.height_max_cms && (<p>{errors.height_max_cms}</p>)}
                </div>

                <div>
                    <label>Weight Min</label>
                    <input type="number" value={input.weight_min_kg} name="weight_min_kg" placeholder = {"Ingrese peso min en kg"} onChange={(e)=>handleChange(e)}/>
                    {errors.weight_min_kg && (<p>{errors.weight_min_kg}</p>)}
                </div>

                <div>
                    <label>Weight Max</label>
                    <input type="number" value={input.weight_max_kg} name="weight_max_kg" placeholder = {"Ingrese peso max en kg"} onChange={(e)=>handleChange(e)}/>
                    {errors.weight_max_kg && (<p>{errors.weight_max_kg}</p>)}
                </div>

                <div>
                    <label>Life Span Years</label>
                    <input type="number" value={input.lifeSpan} name="lifeSpan" placeholder = {"Ingrese esperanza de vida en años"} onChange={(e)=>handleChange(e)}/>
                    {errors.lifeSpan && (<p>{errors.lifeSpan}</p>)}
                </div>

                <div>
                    <label>Temperaments</label>
                    <select onChange={(e) => handleSelect(e)} value={input.temperaments}>
                    <option value="">Seleccione un temperamento</option>
                        {temperaments.map((temp) => (
                            <option value={temp.name}>
                                {temp.name}
                            </option>
                        ))}
                    </select>

                    <ul><li>{input.temperaments.map(temp => temp + " ")}</li></ul>
                    {errors.temperaments && (<p>{errors.temperaments}</p>)}

                </div>

            <button type="submit" disabled={disable()}>Crear Perro</button>
                
            </form>

            {input.temperaments.map((temp) => 
            
            <div>
                    <button onClick={()=> handleDelete(temp)}>x</button>
                    <p>{temp}</p>
                </div>
            
            )}


        </div>
    )

}




export default CreateDog; 









