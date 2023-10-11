import React from "react";

function CreatePriorite({state}) {

    if (state.isLogged) {



    return (
        <div>
            <div className="create-priorite">
                <h2 className="form-group p-2 mb-3">Créer une Priorite</h2>
                <form action="http://localhost:3001/create-priorite" method="post">
                <div className="form-group p-2 mb-3">
                    <input className="p-2 mb-3" type="text" name="name" placeholder="Nom de la prioritée"></input>
                </div>
                    <button  className="p-2 mb-3 btn btn-primary" type="submit" value="Create Priorite">Créer prioritée</button>
                </form>
            </div>
        </div>
    )} else {
        return(
            <div>
                <p>Veuillez vous connectez</p>
            </div>
        )
    }
}

export default CreatePriorite;