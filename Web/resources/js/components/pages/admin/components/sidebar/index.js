import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import Logo from "../../../../default components/logo";
import NotificationApi from "../../../../api/NotificationApi";

export default function Sidebar() {

    const {menu} = NotificationApi();

    return (
        <div className={`sidebar ${menu ? 'open' : 'closed'}`}>
            <Logo className={'logo'}/>
            <div className="links">
                <p title={'Navigatie'}>{menu ? 'Navigatie' : '...'}</p>
                <NavLink activeClassName={'is-active'} title={'Overzicht'} exact to={'/admin'}><img src={'/images/tile.svg'} alt={''}/> {menu ? 'Overzicht' : null}</NavLink>
                <NavLink activeClassName={'is-active'} title={'Organisaties'} exact to={'/admin/organisations'}><img src={'/images/organisation.svg'} alt={''}/> {menu ? 'Organisaties' : null}</NavLink>
                <NavLink activeClassName={'is-active'} title={'Schermen aanpassen'} exact to={'/admin/edit/screens'}><img src={'/images/screens.svg'} alt={''}/> {menu ? 'Schermen aanpassen' : ''}</NavLink>
            </div>
        </div>
    )
}
