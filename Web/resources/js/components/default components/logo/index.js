import React from 'react';
import {ReactSVG} from "react-svg";
import NotificationApi from "../../api/NotificationApi";

export default function Logo({className}) {

    const {menu, setMenu} = NotificationApi();

    return (
        <div className={className}>
            <ReactSVG className={className} src={menu ? '/images/logo.svg' : '/images/logo-icon-only.svg'}/>
        </div>
    )
}
