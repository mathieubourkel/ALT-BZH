import './App.css';
import React, {useState} from "react";
import Home from "./components/Home";
import Nav from "./components/Nav";
import CreateUser from "./components/CreateUser";
import CreateTask from "./components/CreateTask";
import CreateStatus from "./components/CreateStatus";
import CreatePriorite from "./components/CreatePriorite";
import CreateCategorie from "./components/CreateCategorie";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  const [state, setState] = useState({isLogged: true, isAdmin: true, name: "Mathieu", email: "mathieu@gmail.com"});

  return (

      <div className="App"> 
             <BrowserRouter>
              <Nav state={state} setState={setState}/>
              <Routes>
                <Route path="/" element={<Home state={state}/>} />
                <Route path="/create-task" element={<CreateTask state={state}/>} />
                <Route path="/create-user" element={<CreateUser state={state}/>} />
                <Route path="/create-categorie" element={<CreateCategorie state={state} />} />
                <Route path="/create-status" element={<CreateStatus state={state} />} />
                <Route path="/create-priorite" element={<CreatePriorite state={state} />} />
                <Route path="/login" element={<Login state={state} setState={setState}/>} />
              </Routes>
          </BrowserRouter>
      </div> 

  );


}

export default App;
