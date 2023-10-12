import React from "react";

function CreateUser({state}) {

    if (state.isAdmin == true) {

        return (
            <div>
                <div className="create-user">
                    <h2 className="form-group p-2 mb-3">Créer un utilisateur</h2>
                    <form action="http://localhost:3001/create-user" method="post">
                    <div className="form-group p-2 mb-3">
                        <input className="p-2 mb-3" type="text" name="label" placeholder="Nom de l'utilisateur"></input>
                    </div>
                    <div className="form-group p-2 mb-3">
                        <input className="p-2 mb-3" type="text" name="email" placeholder="Email de l'utilisateur"></input>
                    </div>   
                    <div className="form-group p-2 mb-3">
                        <input className="p-2 mb-3" type="checkbox" name="isAdmin" id="isAdmin" value='true'></input>
                        <label className="p-2 mb-3" htmlFor="isAdmin">Administrateur</label>
                    </div>   
                    <div className="form-group p-2 mb-3">
                        <input className="p-2 mb-3" type="password" name="password" placeholder="Password de l'utilisateur"></input>
                    </div> 
                    <div className="form-group p-2 mb-3">
                        <input className="p-2 mb-3" type="password" name="check-password" placeholder="Retapez votre mot de passe"></input>
                    </div> 

                        <button className="p-2 mb-3 btn btn-primary" type="submit" value="Create User">Créer utilisateur</button>
                    </form>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h1>
                    Vous n'avez pas les droits pour accéder à cette page
                </h1>
            </div>
        )
    }

    
}

export default CreateUser;