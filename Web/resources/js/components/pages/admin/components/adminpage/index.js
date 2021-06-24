import React from 'react';

import './index.scss';
import NotificationApi from "../../../../api/NotificationApi";

export default function AdminPage({children}) {

    const {menu, setMenu} = NotificationApi();

    return (
        <div className={`adminpage ${menu ? 'open' : 'closed'}`}>
            {children}
        </div>
    )
}
