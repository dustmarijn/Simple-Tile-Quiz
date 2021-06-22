import React from 'react';
import {NavLink} from 'react-router-dom';
import Logo from "../../../../default components/logo";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <Logo className={'logo'}/>
            <div className="links">
                <p>Navigatie</p>
                <NavLink activeClassName={'is-active'} exact to={'/admin'}><img src={'/images/tile.svg'} alt={''}/> Overzicht</NavLink>
                <NavLink activeClassName={'is-active'} exact to={'/admin/organisations'}><img src={'/images/organisation.svg'} alt={''}/> Organisaties</NavLink>
                <NavLink activeClassName={'is-active'} exact to={'/admin/edit/screens'}><img src={'/images/screens.svg'} alt={''}/> Schermen aanpassen</NavLink>
            </div>
        </div>
    )
}
