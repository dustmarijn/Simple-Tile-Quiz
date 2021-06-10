import React from 'react';
import {NavLink} from 'react-router-dom';
import Logo from "../../../../default components/logo";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <Logo className={'logo'}/>
            <div className="links">
                <p>Navigatie</p>
                <NavLink activeClassName={'is-active'} exact to={'/admin'}>Overzicht</NavLink>
                <NavLink activeClassName={'is-active'} exact to={'/admin/organisations'}>Organisaties</NavLink>
                <NavLink activeClassName={'is-active'} exact to={'/admin/edit/screens'}>Schermen aanpassen</NavLink>
            </div>
        </div>
    )
}
