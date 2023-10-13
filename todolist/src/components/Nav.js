import Dropdown from 'react-bootstrap/Dropdown';

function Nav({state, setState}) {

    function logout(){
        if(state.isLogged){
            setState({isLogged: false})     
        }   
    }

    if (state.isLogged === true) {

        return (
            <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Tableau de bord</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className='nav-item'><a href="create-task" className="nav-link btn btn-primary text-white">Créer une tâche</a></li>
                            
                            {state.isAdmin ? 
                            
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                    Admin
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="create-status">Créer un status</Dropdown.Item>
                                    <Dropdown.Item href="create-categorie">Créer une catégorie</Dropdown.Item>
                                    <Dropdown.Item href="create-priorite">Créer une prioritée</Dropdown.Item>
                                    <Dropdown.Item href="create-user">Créer un utilisateur</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            : null }
                            
                            {state.isLogged ? 
                            <button onClick={() => logout()} className="btn btn-primary" type="submit" value="Create User">Log Out</button>
                             :  null 
                            }
                        </ul>
                    </div>
                    <div>
                        <p className='text-white'>{state.name}</p>
                        <p className='text-white'>{state.email}</p>
                        <p className='text-white'>Connecté</p>
                    </div>
                </div>
            </nav>
        )
    } else {
        return (
            <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Tableau de bord</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                    </div>
                </div>
            </nav>
        )
    }

    
}

export default Nav;