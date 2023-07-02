import "./App.css"
import {Landing, Home, Detail, Form} from "./views/indexViews"; 
import {Route, useLocation} from "react-router-dom"; 
import NavBar from "./Components/NavBar/navBar"
import { useState } from "react";
import axios from "axios";



function App() {

  const location = useLocation()
  
  let [dogs, setDogs] = useState([])
  
  const onSearch = async (name) => {
  
    
    try {

      const data = (await axios.get(`http://localhost:3005/dogs/?name=${name}`)).data

      if (data.name){
        setDogs((oldDogs) => [...oldDogs, data]); 
      }
      
    } catch (error) {
      alert("No hay perros de esa raza")
    }
  };


  return (
    <div className="App">

      {location.pathname !== "/" && <NavBar onSearch={onSearch}/>} {/* Este es un hook de react para que la navbar me aparezca solamente donde lo necesito */}

      <Route exact path="/" render = {()=> <Landing/>}/>
      <Route exact path="/home" render = {()=> <Home dogs={dogs}/>}/>
      <Route exact path="/detail" render = {()=> <Detail/>}/>
      <Route exact path="/create" render = {()=> <Form/>}/>

    </div>
  );
}

export default App;
