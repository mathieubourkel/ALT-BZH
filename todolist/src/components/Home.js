import React, { useEffect, useState } from "react";
export const URL = "http://localhost:3001";

function Home({state}) {

    const [cat, setCat] = useState([]);
    const [priorite, setPriorite] = useState([]);
    const [status, setStatus] = useState([]);
    const [users, setUsers] = useState([]);
    const [dashboard, setDashboard] = useState([]);
    const [display, setDisplay] = useState(true);
    const [displayTerm, setDisplayTerm] = useState(false);
    const [myTask, setMyTask] = useState({
        value: null, label: "", description: "", categorie: "", status: "", dateCrea: "", dateMax: "",
        dateUpdate: "", userCrea: "", usersAffected: []
    })

    const funCat = async () => {
        const response = await fetch(URL + "/categories").then((response) => response.json());
        setCat(response);
    }

    const funPriorites = async () => {
        const response = await fetch(URL + "/priorites").then((response) => response.json());
        setPriorite(response);
    }


    const funStatus = async () => {
        const response = await fetch(URL + "/status").then((response) => response.json());
        setStatus(response);
    }

    const funUsers = async () => {
        const response = await fetch(URL + "/users").then((response) => response.json());
        setUsers(response);
    }

    const funTasks = async () => {
        const response = await fetch(URL + "/dashboard").then((response) => response.json());
        setDashboard(response);
    }

    useEffect(() => {
        funStatus();
        funCat();
        funPriorites();
        funUsers();
        funTasks();
      }, []);

    function displayMyTask(task){
        setMyTask({
            value: task.value, label: task.label, description: task.description, categorie: cat[task.categorie - 1].label,
            status: status[task.status - 1].label, priorite: priorite[task.priorite - 1].label, dateCrea: task.dateCrea, dateUpdate: task.dateUpdate,
            userCrea: task.userCrea, usersAffected: task.usersAffected, dateMax: task.dateMax
            
        });
        setDisplay(false);
        
    }

    function funcDisplayTerm(){
        !displayTerm ? setDisplayTerm(true) : setDisplayTerm(false)
    }

    
    if (display) {
        if (state.isLogged === true) {
            return (
                <body className='container'>
                <div className='home row d-flex justify-content-beetween'>
                {displayTerm ? 
                    <div className='button-display p-3 mb-2'>
                        <button onClick={() => funcDisplayTerm()} className="btn btn-primary">Masquer tâches terminées</button>
                    </div> 
                :   <div className='button-display p-3 mb-2'>
                        <button onClick={() => funcDisplayTerm()} className="btn btn-primary">Afficher tâches terminées</button>
                    </div>
                    }
                
                {dashboard.map((x) => {
                    if (x.status === 3 && !displayTerm) {
                        return null
                    } else {
                    return <div className="card m-2 col-sm-6 mb-3 mb-sm-0" style={{width: "20rem"}}>
                        <div className="card-header">{x.label}</div>
                        <div className="card-body">
                            <h5 className='card-title'>{cat[x.categorie - 1].label}</h5>
                            {x.priorite === 3 ? <p className="card-text p-1 mb-2 bg-danger text-white">{priorite[x.priorite - 1].label}</p>
                            : <p className="card-text p-1 mb-2 bg-success text-white">{priorite[x.priorite - 1].label}</p> }
                            <h5 className='card-title'>{status[x.status - 1].label}</h5>
                            <button onClick={() => displayMyTask(x)} className="btn btn-primary">Ouvrir la tâche</button>
                        </div>    
                    </div> }}                  
                    )}
                    </div> 
                    </body>
                )
                
        } else {
            return(
                <div className="login">
                    <h2 className="form-group p-2 mb-3">Se connecter</h2>
                    <form action={URL + "/login"} method="post">
                    <div className="form-group p-2 mb-3">
                        <input className="p-2 mb-3" type="text" name="email" placeholder="Email de l'utilisateur"></input>
                    </div>   
                    <div className="form-group p-2 mb-3">
                        <input className="p-2 mb-3" type="password" name="password" placeholder="Password de l'utilisateur"></input>
                    </div> 
                        <button className="p-2 mb-3 btn btn-primary" type="submit" value="Login">Se connecter</button>
                    </form>
                </div>
            )
        }
    } else {

        return(
            <form action={URL + "/modify-task"} method="post">
            <div className='d-flex justify-content-center m-2'>
            <div className="card" style={{width: "50rem"}}> 
                    <div className="card-body">
                        <h5 className="list-group-item">ID: {myTask.value}</h5>
                        <h5 className="card-title">{myTask.label}</h5>
                        <p className="card-text">{myTask.description}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Status : {myTask.status}
                        </li>
                        <li className="list-group-item">Priorité : {myTask.priorite}
                        </li>
                        <li className="list-group-item">Catégorie : {myTask.categorie}
                        </li>
                        <li className="list-group-item">Date de création : {myTask.dateCrea} </li>
                        <li className="list-group-item">Date maximum : {myTask.dateMax} </li>
                        <li className="list-group-item">Dernière update : {myTask.dateUpdate}</li>
                        <li className="list-group-item">Propriétaire : {myTask.userCrea}</li>
                        
                        <li className="list-group-item">Utilisateurs affectés : {myTask.usersAffected.map((y) =>  
                            <p>{users[y - 1].label} </p>)}
                        </li>
                        
                       
                    </ul>
                    <button className="p-2 mb-3 btn btn-primary" type="submit" value="modifier">Modifier</button>
                </div>
                </div>
                </form>
        )
    }
    
}

export default Home;