import React, {useEffect, useState} from 'react';
import NotificationApi from "../../../../api/NotificationApi";

export default function TitleBar() {
    const {menu, pageTitle} = NotificationApi();

    return (
        <div className={`titlebar ${menu ? 'open' : 'closed'}`}>
            {pageTitle ?
                <h1>{pageTitle ? pageTitle === 'admin' ? 'Overzicht' : pageTitle === 'organisations' ? 'Organisaties' : pageTitle === 'screens' ? 'Schermen aanpassen' : 'Pagina niet gevonden' : '404'}</h1>
            : null }
        </div>
    )
}
