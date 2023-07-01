  import Card from "../../Components/Card/Card"; 
  import style from "./Detail.module.css"
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { getDogsById } from "../../Redux/actions";
// // import {useParams} from "react-router-dom"; 



const Detail = () => {

//     const dispatch = useDispatch(); 
     

//     useEffect(()=>{
//         dispatch(getDogsById());
//     },[dispatch]); 

    return (
        <div className={style.Detail}>
        <h1>ESTA ES LA VISTA DE DETAIL</h1>

            <Card/>
    
        </div>
    )
}; 

export default Detail; 