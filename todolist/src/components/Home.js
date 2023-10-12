import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';

function Home({state}) {

    const [cat, setCat] = useState([]);
    const [priorite, setPriorite] = useState([]);
    const [status, setStatus] = useState([]);
    const [users, setUsers] = useState([]);
    const [dashboard, setDashboard] = useState([]);
    const [display, setDisplay] = useState(true);
    const [myTask, setMyTask] = useState({
        value: null, label: "", description: "", categorie: "", status: "", dateCrea: "", dateMax: "",
        dateUpdate: "", userCrea: "", usersAffected: []
    })

    const urlCategories = "http://localhost:3001/categories";
    const urlPriorites = "http://localhost:3001/priorites";
    const urlStatus = "http://localhost:3001/status";
    const urlUsers = "http://localhost:3001/users";
    const urlTasks = "http://localhost:3001/dashboard";

    const categories = async () => {
        const response = await fetch(urlCategories).then((response) => response.json());
        setCat(response);
    }

    const priorites = async () => {
        const response = await fetch(urlPriorites).then((response) => response.json());
        setPriorite(response);
    }


    const statuss = async () => {
        const response = await fetch(urlStatus).then((response) => response.json());
        setStatus(response);
    }

    const userss = async () => {
        const response = await fetch(urlUsers).then((response) => response.json());
        setUsers(response);
    }

    const tasks = async () => {
        const response = await fetch(urlTasks).then((response) => response.json());
        setDashboard(response);
    }

    useEffect(() => {
        statuss();
        categories();
        priorites();
        userss();
        tasks();
      }, []);

    function displayMyTask(task){
        setMyTask({
            value: task.value, label: task.label, description: task.description, categorie: cat[task.categorie - 1].label,
            status: status[task.status - 1].label, priorite: priorite[task.priorite - 1].label, dateCrea: task.dateCrea, dateUpdate: task.dateUpdate,
            userCrea: task.userCrea, usersAffected: task.usersAffected, dateMax: task.dateMax
            
        });
        setDisplay(false);
        
    }

    if (display) {
    if (state.isLogged === true) {
        return (
            <div className='home'>
                <div className='row'>
                    
                    {dashboard.map((x) => (
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            { x.status === 3 ? null  : 
                                <div className="card" style={{width: "20rem"}}> 
                                    <div className="card-header">
                                        {x.label}
                                    </div>
                        <div className="card-body">
                            <h5 className='card-title'>{cat[x.categorie - 1].label}</h5>
                            {x.priorite === 3 ? <p className="card-text p-1 mb-2 bg-danger text-white">{priorite[x.priorite - 1].label}</p>
                            : <p className="card-text p-1 mb-2 bg-success text-white">{priorite[x.priorite - 1].label}</p> }
                        <h5 className='card-title'>{status[x.status - 1].label}</h5>
                        <button onClick={() => displayMyTask(x)} className="btn btn-primary">Ouvrir la tâche</button>
                        
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
            <div className="login">
                <h2 className="form-group p-2 mb-3">Se connecter</h2>
                <form action="http://localhost:3001/login" method="post">
                <div className="form-group p-2 mb-3">
                    <input className="p-2 mb-3" type="text" name="email" placeholder="Email de l'utilisateur"></input>
                </div>   
                <div className="form-group p-2 mb-3">
                    <input className="p-2 mb-3" type="password" name="password" placeholder="Password de l'utilisateur"></input>
                </div> 
                    <button className="p-2 mb-3 btn btn-primary" type="submit" value="Login">Se connecter</button>
                </form>
            </div>
        </div>
        )
    }
    } else {
        console.log(myTask)
        return(
            <form action="http://localhost:3001/modify-task" method="post">
            <div className="card" style={{width: "18rem"}}> 
                    <div className="card-body">
                        <h5 className="card-title">{myTask.label}</h5>
                        <p className="list-group-item">{myTask.value}</p>
                        <p className="card-text">{myTask.description}</p>
                        {/* <input className="p-2 mb-3" type="text" name="description" placeholder="Nouvelle description"></input> */}
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">{myTask.status}
                        </li>
                        <li className="list-group-item">{myTask.priorite}
                        </li>
                        <li className="list-group-item">{myTask.categorie}
                        </li>
                        <li className="list-group-item">{myTask.dateCrea} </li>
                        <li className="list-group-item">{myTask.dateMax} </li>
                        <li className="list-group-item">{myTask.dateUpdate}</li>
                        <li className="list-group-item">Propriétaire : {myTask.userCrea}</li>
                        
                        <li className="list-group-item">Utilisateurs affectés</li>
                        {myTask.usersAffected.map((y) =>  <li className="list-group-item">{users[y - 1].label}
                        </li>)}
                       
                    </ul>
                    <button className="p-2 mb-3 btn btn-primary" type="submit" value="modifier">Modifier</button>
                </div>
                </form>
        )
    }
    
}

export default Home;