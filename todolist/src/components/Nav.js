import React from "react";
import 'bootstrap/dist/css/bootstrap.css';

function Nav() {
    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Tableau de bord</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className='nav-item'><a href="create-task" className="nav-link">Créer Tâche</a></li>
                        <li className='nav-item'><a href="create-user" className="nav-link">Créer User</a></li>
                        <li className='nav-item'><a href="loggin" className="nav-link">Se connecter</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav;