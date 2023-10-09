import React from "react";
import "./styles/Nav.css";

function Nav() {
    return (
        <div className='nav'>
            <div className='nav-list'>
                <ul>
                    <li>Dashboard</li>
                    <li>Create Task</li>
                    <li>Create User</li>
                </ul>
            </div>
        </div>
    )
}

export default Nav;