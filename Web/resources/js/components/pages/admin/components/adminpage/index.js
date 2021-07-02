import React from 'react';

// Styles worden ingeladen.
import './index.scss';

// Api Provider's die worden gebruikt.
import NotificationApi from "../../../../api/NotificationApi";

/** Deze functie is een hoofd component met een bepaalde style.
* Hier in komen alle andere onderdelen van de website (Alleen de admin).
*/
export default function AdminPage({children}) {

    const {menu} = NotificationApi();

    return (
        <div className={`adminpage ${menu ? 'open' : 'closed'}`}>
            {children}
        </div>
    )
}
