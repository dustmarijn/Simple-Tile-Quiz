import React from 'react';

/**
 * Deze functie laat een hamburger menu zien om de sidebar
 * breeder of smaller te maken.
 */
export default function Menu({setMenu, menu}) {
    return (
        <div className="menu" onClick={() => setMenu(!menu)}>
            <div className="line"/>
            <div className="line"/>
            <div className="line"/>
        </div>
    )
}
