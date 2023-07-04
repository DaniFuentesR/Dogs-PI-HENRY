import { useState } from "react";
import style from "./Form.module.css"
import axios from "axios";




const Form = () => {

   

    const [formData, setFormData] = useState({
        name: "",
        heightMin: "", 
        heightMax: "",
        weightMin: "",
        weightMax: "",  
        lifeSpan: "", 
        temperament: "", 
    }); 

    
    
    const [errors, setErrors] = useState({
        name: "Campo Obligatorio",
        heightMin: "Campo Obligatorio", 
        heightMax: "Campo Obligatorio",
        weightMin: "Campo Obligatorio",
        weightMax: "Campo Obligatorio",  
        lifeSpan: "Campo Obligatorio", 
        temperament: "Campo Obligatorio", 
    }); 
    
    const validate = (formData, name) => {
        
        if (name === "name") {
            if (formData.name !== "") setErrors({...errors, name: ""})
            else setErrors({...errors, name: "Campo Obligatorio"})
            return; 
        }

        if (name === "heightMin") {
            if (formData.heightMin !== "") setErrors({...errors, heightMin: ""})
            else setErrors({...errors, name: "Campo Obligatorio"})
            return; 
        }
        
        if (name === "heightMax") {
            if (formData.heightMax !== "") setErrors({...errors, heightMax: ""})
            else setErrors({...errors, name: "Campo Obligatorio"})
            return; 
        }
        
        if (name === "weightMin") {
            if (formData.weightMin !== "") setErrors({...errors, weightMin: ""})
            else setErrors({...errors, name: "Campo Obligatorio"})
            return; 
        }
        
        if (name === "weightMax") {
            if (formData.weightMax !== "") setErrors({...errors, weightMax: ""})
            else setErrors({...errors, name: "Campo Obligatorio"})
            return; 
        }
        
        if (name === "lifeSpan") {
            if (formData.lifeSpan !== "") setErrors({...errors, lifeSpan: ""})
            else setErrors({...errors, name: "Campo Obligatorio"})
            return; 
        }
        
        if (name === "temperament") {
            if (formData.temperament !== "") setErrors({...errors, temperament: ""})
            else setErrors({...errors, name: "Campo Obligatorio"})
            return; 
        }
        
    }; 
    
    
    const changeHandler = (event) => {
        const property = event.target.name; 
        const value = event.target.value

        setFormData({...formData, 
                [property]:value
            }) 

        validate ({
            ...formData, 
            [property]:value
        }, property); 
        }; 
    
    const submitHandler = async (event) => { 
        event.preventDefault()

        const combinedHeight = `${formData.heightMin}-${formData.heightMax}`;
        const combinedWeight = `${formData.weightMin}-${formData.weightMax}`;
      
        const formattedData = {
            ...formData,
            height_cms: combinedHeight.toString(),
            weight_kg: combinedWeight.toString ()
        };

        axios.post("http://localhost:3005/dogs/", formattedData)
        .then(res=>alert(res)); 

        // const {
        //     weightMin,
        //     weightMax,
        //     heightMin,
        //     heightMax,
        //   } = formattedData;


        
          
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
                <input type="text" value={formData.name} onChange={changeHandler} name="name"/>
                {errors.name}

            </label>

            <label>

                <label>Min Height </label>
                <input type="Number" value={formData.height} onChange={changeHandler} name="heightMin"/>
                {errors.heightMin}
            </label>

            <label>

                <label>Max Height </label>
                <input type="Number" value={formData.height} onChange={changeHandler} name="heightMax"/>
                {errors.heightMax}
                </label>

            <label>

                <label> Min Weight </label>
                <input type="Number" value={formData.weight} onChange={changeHandler} name="weightMin"/>
                {errors.weightMin}
            </label>

            <label>

                <label>Max Weight </label>
                <input type="Number" value={formData.height} onChange={changeHandler} name="weightMax"/>
                {errors.heightMax}
                </label>

            <label>

                <label>LifeSpan </label>
                <input type="text" value={formData.lifeSpan} onChange={changeHandler} name="lifeSpan"/>
                {errors.lifeSpan}
            </label>

            <label>

                <label>Temperament </label>
                <input type="text" value={formData.temperament} onChange={changeHandler} name="temperament"/> {errors.temperament}
                
            </label>

            <label>
                <button type="sumbit" disabled={disable()}>Create Breed</button>
            </label>
        </form>
    )
}; 

export default Form; 