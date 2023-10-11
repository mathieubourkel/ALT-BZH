import React from "react";

function Login() {

    
    return (
        <div>
            <div className="login">
                <h2 className="form-group p-2 mb-3">Se connecter</h2>
                <form action="http://localhost:3001/login" method="post">
                <div className="form-group p-2 mb-3">
                    <input className="p-2 mb-3" type="text" name="email" placeholder="Email de l'utilisateur"></input>
                </div>   
                <div className="form-group p-2 mb-3">
                    <input className="p-2 mb-3" type="password" name="password" placeholder="Password de l'utilisateur"></input>
                </div> 
                    <button className="p-2 mb-3 btn btn-primary" type="submit" value="Login">Se connecter</button>
                </form>
            </div>
        </div>
    )
}

export default Login;