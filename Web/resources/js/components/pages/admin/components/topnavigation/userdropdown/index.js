import React from 'react';

/**
 * Deze functie opent een menu die informatie van de gebruiker laat zien.
 */
export default function UserDropdown({userDropdown, user, logoutUser}) {
    return (
        userDropdown ?
            <div className="userDropdown">
                <h1>{user?.name}</h1>
                <p>{user?.email}</p>
                <div className="btns">
                    <button className={'btn'} onClick={() => logoutUser()}>Uitloggen</button>
                </div>
            </div>
        : null
    )
}
