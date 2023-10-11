import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Task from "./Task";

function Home({state}) {

    const urlUser = "http//localhost:3001/users";
    const urlTasks = "http://localhost:3001/dashboard";
    
    
    const [dashboard, setDashboard] = useState([]);
 
    const [myTask, setMyTask] = useState({
        name: "", description: "", categorie: "", status: "", dateCrea: "",
        dateUpdate: "", userCrea: "", usersAffected: []
    })
    const [display, setDisplay] = useState(true);

    const tasks = async () => {
        const response = await fetch(urlTasks).then((response) => response.json());
        setDashboard(response);
    }

    useEffect(() => {
        tasks();
      }, []);


    function displayMyTask(task){
        setMyTask({
            name: task.name, description: task.description, categorie: task.categorie,
            status: task.status, dateCrea: task.dateCreation, dateUpdate: task.dateUpdate,
            userCrea: task.userCrea, usersAffected: task.usersAffected
            
        });
        setDisplay(false);
        
    }

    if (display) {
    if (state.isLogged == true) {
        return (
            <div className='home'>
                <div className='row'>
                    
                    {dashboard.map((i) => (
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            { i.status === 1 ? null  : 
                                <div className="card" style={{width: "18rem"}}> 
                                    <div className="card-header">
                                        {i.name}
                                    </div>
                        <div className="card-body">
                            <h5 className='card-title'>{i.description}</h5>
                            <h5 className='card-title'>{i.categorie}</h5>
                        {i.status === 0 ? <p className="card-text p-1 mb-2 bg-success text-white">En cours</p> : i.status === 2 ? <p className="card-text p-1 mb-2 bg-light text-dark" >En attente</p> 
                        : null}
                        {i.priority === 0 ? <p className="card-text" style={{backgroundColor: "yellow"}}>Basse</p> : i.priority === 1 ? <p className="card-text p-1 mb-2 bg-warning text-dark">Moyenne</p> 
                        : <p className="card-text p-1 mb-2 bg-danger text-white" style={{backgroundColor: "red"}}>Haute</p>}
                        <button onClick={() => displayMyTask(i)} className="btn btn-primary">Ouvrir la tâche</button>
                        
                        </div>
                        
                    </div>}
                        
                        </div>
                        
                        ))}
                    
                </div>
            </div>
        )
    } else {
        return(
        <div>
            <h1>Bienvenu sur la To Do List</h1>
            <h2>Veuillez vous connectez pour accéder aux fonctionnalités</h2>
        </div>
        )
    }
    } else {
        return(
            <div>
                <div className="card" style={{width: "18rem"}}> 
                                    <div className="card-header">
                                        {myTask.name}
                                    </div>
                <div className="card-body">
                            <h5 className='card-title'>{myTask.description}</h5>
                            <h5 className='card-title'>{myTask.categorie}</h5>
                        {myTask.status === 0 ? <p className="card-text p-1 mb-2 bg-success text-white">En cours</p> : myTask.status === 2 ? <p className="card-text p-1 mb-2 bg-light text-dark" >En attente</p> 
                        : null}
                        {myTask.priority === 0 ? <p className="card-text" style={{backgroundColor: "yellow"}}>Basse</p> : myTask.priority === 1 ? <p className="card-text p-1 mb-2 bg-warning text-dark">Moyenne</p> 
                        : <p className="card-text p-1 mb-2 bg-danger text-white" style={{backgroundColor: "red"}}>Haute</p>}
                        
                        
                        <p>Date de création : {myTask.dateCrea}</p> 
                        <p>Date Maximum de traitement : {myTask.dateMaximum}</p>     
                        <p>Date de dernière mise à jour :{myTask.dateUpdate}</p>               
                        </div>
            </div>
            </div>
        )
    }
    
}

export default Home;