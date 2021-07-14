import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

// Styles worden ingeladen.
import './index.scss';

/**
 * Deze functie zorgt ervoor dat er een keuze tegel komt met de
 * juiste informatie, zoals een titel, plaatje en een onClick
 * event.
 */
export default function Tile({title, illustration, path, onClick, className}) {
    const history = useHistory()

    const [newImg, setNewImg] = useState(null);

    const img = new Image();

    img.src = '/images/illustrations/' + illustration;

    img.onload = () => {
        setNewImg(img.src);
    };
    img.onerror = () => {
        setNewImg('/images/organisationlogo/' + illustration);
    };

    return (
        <button className={`tile ${className}`} onClick={() => {
            history.push(path);
            if(onClick) {
                onClick();
            }
        }}>
            <img src={newImg ? newImg : ''} alt={''}/>
            <h1>{title}</h1>
        </button>
    )
}
