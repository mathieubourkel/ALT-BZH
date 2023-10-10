import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';

function Home() {

    const urlUser = "http//localhost:3001/users";
    const urlTasks = "http://localhost:3001/dashboard";
    
    const [dashboard, setDashboard] = useState([]);

    const tasks = async () => {
        const response = await fetch(urlTasks).then((response) => response.json());
        setDashboard(response);
    }

    useEffect(() => {
        tasks();
      }, []);

      console.log(dashboard);

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
                    <p>{i.dateCreation}</p> 
                    <p>{i.dateMaximum}</p>
                    <a href='#' className="btn btn-primary">Ouvrir la tâche</a>
                    
                    </div>
                    
                </div>}
                    
                    </div>
                    
                    ))}
                
            </div>
        </div>
    )
}

export default Home;