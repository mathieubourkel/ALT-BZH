import React from "react";

function CreateCategorie({state}) {

    if (state.isLogged) {

    return (
        <div>
            <div className="create-categorie">
                <h2 className="form-group p-2 mb-3">Créer une catégorie</h2>
                <form action="http://localhost:3001/create-categorie" method="post">
                <div className="form-group p-2 mb-3">
                    <input className="p-2 mb-3" type="text" name="name" placeholder="Nom de la catégorie"></input>
                </div>
                    <button className="p-2 mb-3 btn btn-primary" type="submit" value="Create Categorie">Créer catégorie</button>
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

export default CreateCategorie;