import React from 'react';

/**
 * Deze functie laat een rondje zien met de eerste letter van de gebruikersnaam
 * en deze functie opent een menu met de overige gegevens van de gebruiker.
 */
export default function UserContent({setUserDropdown, userDropdown, username}) {
    return (
        <div className="usercontent" onClick={() => setUserDropdown(!userDropdown)}>
            <div className="useravatar">
                <p>{username}</p>
                <div className="status"/>
            </div>
        </div>
    )
}
