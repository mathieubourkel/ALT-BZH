import React from "react";
import Select from 'react-select';

function CreateTask() {

    const status = [
        { value: 0, label: "En cours"},
        { value: 1, label: "Terminée"},
        { value: 2, label: "En attente"}];

    const priority = [
        { value: 0, label: "Basse"},
        { value: 1, label: "Moyenne"},
        { value: 2, label: "Haute"}];
        
    return (
            <div className="create-task card" style={{width: "50rem"}}>
                <h2 className="p-2 mb-3">Créer une tâche</h2>
                <form action="http://localhost:3001/create-task" method="post">
                    <div className="form-group p-2 mb-3">
                        <input className="p-2 mb-3" type="text" name="name" placeholder="Nom de la tâche"></input>
                    </div>
                    <div className="form-group p-2 mb-3">
                        <input className="p-2 mb-3" type="text" name="description" placeholder="Description de la tâche"></input>
                    </div>
                    <div className="form-group p-2 mb-3">
                        <input className="p-2 mb-3" type="text" name="categorie" placeholder="Catégorie de la tâche"></input>
                    </div>
                    <div className="p-2 mb-3">
                        <label htmlFor="status">Quel est le status de la Tâche?
                            <Select name="status" options={status} defaultValue={status[0]}/>
                        </label>
                    </div>
                    <div className="p-2 mb-3">
                        <label htmlFor="priority">Quel est la prioritée de la tâche ?
                            <Select name="priority" options={priority} defaultValue={priority[1]}/>
                        </label>
                    </div>
                    <div className="p-2 mb-3">
                        <label className="p-2 mb-3" htmlFor="date-max">Date Maximum:</label>
                        <input className="p-2 mb-3" type="date" id="date-max" name="dateMax"
                        min="2023-09-10" max="2100-12-31" />
                    </div>
                    
                    <button type="submit" className="p-2 mb-3 btn btn-primary" value="Create Task">Créer Tâche</button>
                    
                </form>
            </div>
            
    )
}

export default CreateTask;