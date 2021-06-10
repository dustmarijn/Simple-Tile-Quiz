import React from 'react';
import {ReactSVG} from "react-svg";

export default function Logo({className}) {
    return (
        <div className={className}>
            <ReactSVG className={className} src={'/images/logo.svg'}/>
        </div>
    )
}
