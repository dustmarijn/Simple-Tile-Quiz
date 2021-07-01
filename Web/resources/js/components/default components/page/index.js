import React from 'react';

// Styles worden opgehaald
import './index.scss';

/**
 * Deze functie is een hoofd component met een bepaalde style.
 * Hier in komen alle andere onderdelen van de website (Niet de admin).
 */
export default function Page({children}) {
    return (
        <div className="page">
            {children}
        </div>
    )
}
