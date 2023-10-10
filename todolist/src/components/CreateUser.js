import React from "react";

function CreateUser() {

    return (
        <div>
            <div className="create-user">
                <h2 className="form-group p-2 mb-3">Créer un utilisateur</h2>
                <form action="http://localhost:3001/create-user" method="post">
                <div className="form-group p-2 mb-3">
                    <input className="p-2 mb-3" type="text" name="name" placeholder="Nom de l'utilisateur"></input>
                </div>
                <div className="form-group p-2 mb-3">
                    <input className="p-2 mb-3" type="text" name="email" placeholder="Email de l'utilisateur"></input>
                </div>   
                    <button className="p-2 mb-3 btn btn-primary" type="submit" value="Create User">Créer utilisateur</button>
                </form>
            </div>
        </div>
    )
}

export default CreateUser;