import React, {useState, useEffect} from "react";
import Select from 'react-select';

function CreateTask({state}) {

    const [cat, setCat] = useState([]);
    const [priorite, setPriorite] = useState([]);
    const [status, setStatus] = useState([]);
    const [users, setUsers] = useState([]);
    const urlCategories = "http://localhost:3001/categories";
    const urlPriorites = "http://localhost:3001/priorites";
    const urlStatus = "http://localhost:3001/status";
    const urlUsers = "http://localhost:3001/users";

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

    useEffect(() => {
        statuss();
        categories();
        priorites();
        userss();
      }, []);

    
    if (state.isLogged) {
        console.log(users)
    return (
        
            <div className="create-task card" style={{width: "50rem"}}>
                <h2 className="p-2 mb-3">Créer une tâche</h2>
                <form action="http://localhost:3001/create-task" method="post">
                    <input type="hidden" name="userCrea" value={state.name}/>
                    <div className="form-group p-2 mb-3">
                        <input className="p-2 mb-3" type="text" name="name" placeholder="Nom de la tâche"></input>
                    </div>
                    <div className="form-group p-2 mb-3">
                        <input className="p-2 mb-3" type="text" name="description" placeholder="Description de la tâche"></input>
                    </div>
                    <div className="p-2 mb-3">
                        <label htmlFor="categorie">Quel est la catégorie de la Tâche?
                        <Select name="categorie" options={cat} defaultValue={{label: "Dev", value:1}}/>
                        </label>
                    </div>
                    <div className="p-2 mb-3">
                        <label htmlFor="status">Quel est le status de la Tâche?
                            <Select name="status" options={status} defaultValue={{label: "En cours", value:1}}/>
                        </label>
                    </div>
                    <div className="p-2 mb-3">
                        <label htmlFor="priorite">Quel est la prioritée de la tâche ?
                            <Select name="priorite" options={priorite} defaultValue={{label: "Moyenne", value:2}}/>
                        </label>
                    </div>
                    <div className="p-2 mb-3">
                        <label className="p-2 mb-3" htmlFor="datMax">Date Maximum:</label>
                        <input className="p-2 mb-3" type="date" id="dateMax" name="dateMax"
                        min="2023-09-10" max="2100-12-31" />
                    </div>
                    <div className="p-2 mb-3">
                    <label className="p-2 mb-3" htmlFor="users">Utilisateurs: </label>
                        <select name="users" id="users" multiple>
                            {users.map((u) => <option value={u.value}>{u.label}</option>)}
                        </select>
                    </div>
                    <button type="submit" className="p-2 mb-3 btn btn-primary" value="Create Task">Créer Tâche</button>
                    
                </form>
            </div>
            
    )} else {
        return(
            <div>
                <p>Veuillez vous connectez</p>
            </div>
        )
    }
}

export default CreateTask;