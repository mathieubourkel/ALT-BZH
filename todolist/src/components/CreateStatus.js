import React from "react";
import {URL} from './Home';

function CreateStatus({state}) {

    if (state.isLogged) {

    return (
        <div>
            <div className="create-status">
                <h2 className="form-group p-2 mb-3">Créer un Status</h2>
                <form action={URL + "/create-status"} method="post">
                <div className="form-group p-2 mb-3">
                    <input className="p-2 mb-3" type="text" name="name" placeholder="Nom du status"></input>
                </div>
                    <button className="p-2 mb-3 btn btn-primary" type="submit" value="Create Status">Créer le status</button>
                </form>
            </div>
        </div>
    )
    } else {
        return(
            <div>
                <p>Veuillez vous connectez</p>
            </div>
        )
    }
}

export default CreateStatus;