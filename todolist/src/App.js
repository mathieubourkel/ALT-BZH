import './App.css';
import React from "react";
import Home from "./components/Home";
import Nav from "./components/Nav";
import CreateUser from "./components/CreateUser";
import CreateTask from "./components/CreateTask";
import Task from "./components/Task";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {

  return (

      <div className="App"> 
             <BrowserRouter>
              <Nav />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-task" element={<CreateTask />} />
                <Route path="/create-user" element={<CreateUser />} />
                <Route path="/task" element={<Task />} />
              </Routes>
          </BrowserRouter>
      </div> 

  );


}

export default App;
