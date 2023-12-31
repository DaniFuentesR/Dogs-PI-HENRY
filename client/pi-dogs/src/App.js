import "./App.css"
import {Landing, Home, Detail, Form} from "./views/indexViews"; 
import {Route, useLocation} from "react-router-dom"; 
import NavBar from "./Components/NavBar/navBar"







function App() {

 
const location = useLocation(); 




  


  return (
    <div className="App">

      {location.pathname !== "/" && <NavBar/>} 
      <Route exact path="/" render = {()=> <Landing/>}/>
      <Route exact path="/home" render = {()=> <Home/>}/>
      <Route exact path="/detail" render = {()=> <Detail/>}/>
      <Route exact path="/create" render = {()=> <Form/>}/>

    </div>
  );
}

export default App;
