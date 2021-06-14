import React from 'react';
import {useHistory} from 'react-router-dom';

import './index.scss';

export default function Tile({title, illustration, path, onClick}) {
    const history = useHistory()
    return (
        <button className="tile" onClick={() => {
            history.push(path);
            onClick();
        }}>
            <img src={'/images/illustrations/' + illustration} alt=""/>
            <h1>{title}</h1>
        </button>
    )
}
