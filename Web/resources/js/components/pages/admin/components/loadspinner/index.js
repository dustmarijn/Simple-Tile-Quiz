import React from 'react';

/**
 * Deze functie laat een laad scherm zien met een spinner.
 * Ook kan je hier zelf tekst aan toevoegen.
 */
export default function LoadSpinner({text}) {
    return (
        <div className="loading">
            <div className="lds-ring">
                <div/>
                <div/>
                <div/>
                <div/>
            </div>
            <h1>{text ? text : 'Bijna klaar ...'}</h1>
        </div>
    )
}
