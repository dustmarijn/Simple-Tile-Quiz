import React, {useEffect, useState} from 'react';

export default function TitleBar({title}) {

    return (
        <div className="titlebar">
            <h1>{title ? title === 'admin' ? 'Overzicht' : title === 'organisations' ? 'Organisaties' : title === 'screens' ? 'Schermen aanpassen' : 'Pagina niet gevonden' : '404'}</h1>
        </div>
    )
}
