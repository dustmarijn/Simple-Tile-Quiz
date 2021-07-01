import React from 'react';

// Api Provider's die kunnen worden gebruikt.
import NotificationApi from "../../../../api/NotificationApi";


/**
 * Deze functie laat een lange bar witte bar zien met de titel
 * van de huidige pagina waarop u zich bevindt.
 */
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
