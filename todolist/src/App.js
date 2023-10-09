import './App.css';
import React from "react";
import Home from "./components/Home";
import Nav from "./components/Nav";
import CreateUser from "./components/CreateUser";
import CreateTask from "./components/CreateTask";
import Task from "./components/Task";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let result = await fetch(
    'http://localhost:3001/create-user', {
        method: "post",
        body: JSON.stringify({ name, email }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    result = await result.json();
    console.warn(result);
    if (result) {
        alert("Data saved succesfully");
        setEmail("");
        setName("");
    }
}
  return (

      <div className="App"> 
        <header className="App-header"> 

            
  <p>A simple React app.....</p> 
    
          <a 
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          > 
            Learn React 
          </a> 
          <form action="../../post" method="post" 
                className="form"> 
            <button type="submit">Connected?</button> 
          </form> 
        </header> 
      </div> 
    // <BrowserRouter>
    //   <Nav />
    //       <Routes>
    //           <Route path="/" element={<Home />} />
    //           <Route path="/create-task" element={<CreateTask />} />
    //           <Route path="/create-user" element={<CreateUser />} />
    //           <Route path="/task" element={<Task />} />
    //       </Routes>
    // </BrowserRouter>
  );


}

export default App;
