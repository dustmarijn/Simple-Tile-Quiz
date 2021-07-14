import React from 'react';
import {ReactSVG} from "react-svg";
import NotificationApi from "../../api/NotificationApi";

/**
 * Deze functie zorgt er voor dat het SamenZwolle logo kan worden getoont.
 */
export default function Logo({className}) {

    const {menu} = NotificationApi();

    return (
        <div className={className}>
            <ReactSVG className={className} src={menu ? '/images/logo.svg' : '/images/logo-icon-only.svg'}/>
        </div>
    )
}
