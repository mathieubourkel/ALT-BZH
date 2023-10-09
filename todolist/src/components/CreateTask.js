import React from "react";

function CreateTask() {
    return (
        <div>
            <div class="create-task">
                <h1>Create Task</h1>
                <form action="/page-traitement-donnees" method="post">
                <div>
                    <label for="nom">Nom de la tâche</label>
                    <input></input>
                </div>
                <div>
                    <label for="description">Description de la tâche</label> 
                    <input></input>
                </div>
                <div>
                    <label for="status">Quel est le status de la tâche</label>
                    <select name="status" id="status" required>
                        <option value="en-attente">En Attente</option>
                        <option value="en-cours" selected>En cours</option>
                        <option value="terminee">Terminée</option>
                    </select>
                </div>
                <div>
                    <label for="priority">Quel est la prioritée ?</label>
                    <select name="priority" id="priority" required>
                        <option value="basse">Basse</option>
                        <option value="moyenne" selected>Moyenne</option>
                        <option value="haute">Haute</option>
                    </select>
                </div>
                <div>
                    <label for="users">Responsables de la tâche</label>
                    <select name="priority" id="priority" required multiple size="2">
                        <option value="pierre">Pierre</option>
                        <option value="paul" selected>Paul</option>
                    </select>
                </div>
                <div>
                    <label for="date-max">Date Maximum:</label>
                    <input type="date" id="date-max" name="trip-start"
                     min="2023-09-10" max="2100-12-31" />
                </div>
                
                <button type="submit" value="Create Task">Créer Tâche</button>
                </form>
            </div>
        </div>
    )
}

export default CreateTask;