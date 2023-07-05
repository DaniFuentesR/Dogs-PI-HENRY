import { useState } from "react";
import style from "./Form.module.css"
import axios from "axios";
import { useEffect } from "react";




const Form = () => {

   

    const [formData, setFormData] = useState({
        name: "",
        image: "",
        height_min_cms: "", 
        height_max_cms: "",
        weight_min_kg: "",
        weight_max_kg: "",  
        lifeSpan: "", 
        temperaments: "", 
    }); 

    
    
    const [errors, setErrors] = useState({
        name: "Campo Obligatorio",
        height_min_cms: "Campo Obligatorio", 
        height_max_cms: "Campo Obligatorio",
        weight_min_kg: "Campo Obligatorio",
        weight_max_kg: "Campo Obligatorio",  
        lifeSpan: "Campo Obligatorio", 
        temperaments: "Campo Obligatorio", 
    }); 

    const [allTemperaments, setAllTemperaments] = useState([]);

    useEffect(() => {
        
        axios.get("http://localhost:3006/temperament")
        .then((response) => {
            setAllTemperaments(response.data)
        })
        .catch(error => {
            console.log(error);
        });
    }, []);
    
    
    const validate = (formData, name) => {
        
        if (name === "name") {
            if (formData.name !== "") setErrors({...errors, name: ""})
            else setErrors({...errors, name: "Campo Obligatorio"})
            return; 
        }

        if (name === "height_min_cms") {
            if (formData.height_min_cms !== "") setErrors({...errors, height_min_cms: ""})
            else setErrors({...errors, height_min_cms: "Campo Obligatorio"})
            return; 
        }
        
        if (name === "height_max_cms") {
            if (formData.height_max_cms !== "") setErrors({...errors, height_max_cms: ""})
            else setErrors({...errors, height_max_cms: "Campo Obligatorio"})
            return; 
        }
        
        if (name === "weight_min_kg") {
            if (formData.weight_min_kg !== "") setErrors({...errors, weight_min_kg: ""})
            else setErrors({...errors, weight_min_kg: "Campo Obligatorio"})
            return; 
        }
        
        if (name === "weight_max_kg") {
            if (formData.weight_max_kg !== "") setErrors({...errors, weight_max_kg: ""})
            else setErrors({...errors, weight_max_kg: "Campo Obligatorio"})
            return; 
        }
        
        if (name === "lifeSpan") {
            if (formData.lifeSpan !== "") setErrors({...errors, lifeSpan: ""})
            else setErrors({...errors, lifeSpan: "Campo Obligatorio"})
            return; 
        }
    
      
        if (name === "temperaments") {
            if (formData.temperaments !== null && formData.temperaments !== undefined) {
              setErrors({ ...errors, temperaments: "" });
            } else {
              setErrors({ ...errors, temperaments: "Campo Obligatorio" });
            }
            return;
          }
        
    }; 
    
    
    const changeHandler = (event) => {
        const property = event.target.name; 
        const value = event.target.value

        if (property === "temperament") {
            const selectedTemperament = allTemperaments.find(
              (temperament) => temperament.name === value
            );
            setFormData({ ...formData, temperaments: selectedTemperament });
          } else {
            setFormData({ ...formData, [property]: value });
          }

        validate ({
            ...formData, 
            [property]:value
        }, property); 
        
        
    }
    
    const submitHandler = (event) => { 
        event.preventDefault()
        


            try {
                axios.post("http://localhost:3006/dogs/", formData)
                alert("Perro creado con éxito")
            } catch (error) {
                alert(error.response.data.error)
            }
    }

    const disable = () => {
        let disabled = true;
        for (let error in errors) {
            if (errors[error] === "") disabled = false; 
            else {
                disabled = true;
                break
            }
        }
        return disabled
    }
    
    return (
        <form onSubmit={submitHandler} className={style.Form}>

            <label>
                <label>Name </label>
                <input type="text" value={formData.name} onChange={changeHandler} name="name" placeholder="Insert Name"/>
                {errors.name}

            </label>

            <label>
                <label>Image </label>
                <input type="text" value={formData.image} onChange={changeHandler} name="image" placeholder="Insert image url"/>
                

            </label>

            <label>

                <label>Min Height </label>
                <input type="Number" value={formData.height_min_cms} onChange={changeHandler} name="height_min_cms" placeholder="Insert Minimum Height" />
                {errors.height_min_cms}
            </label>

            <label>

                <label>Max Height </label>
                <input type="Number" value={formData.height_max_cms} onChange={changeHandler} name="height_max_cms" placeholder="Insert Maximum Height" />
                {errors.height_max_cms}
                </label>

            <label>

                <label> Min Weight </label>
                <input type="Number" value={formData.weight_min_kg} onChange={changeHandler} name="weight_min_kg" placeholder="Insert Minimum Weight"/>
                {errors.weight_min_kg}
            </label>

            <label>

                <label>Max Weight </label>
                <input type="Number" value={formData.weight_max_kg} onChange={changeHandler} name="weight_max_kg" placeholder="Insert Maximum Weight"/>
                {errors.weight_max_kg}
                </label>

            <label>

                <label>LifeSpan </label>
                <input type="text" value={formData.lifeSpan} onChange={changeHandler} name="lifeSpan" placeholder="Insert Life Span"/>
                {errors.lifeSpan}
            </label>

            <label>

                <label>Temperament </label>

                <select name="temperaments" onChange={changeHandler} value={formData.temperaments}>
                    <option value="">Seleccione un temperamento</option>
                        {allTemperaments.map((temperament) => (
                        <option key={temperament.id} value={temperament.name}>
                        {temperament.name}
                    </option>
                ))}
                 {errors.temperaments}
                </select>

            </label>

            <label>
                <button type="submit" disabled={disable()}>Create Breed</button>
            </label>
        </form>
    )
}; 

export default Form; 

