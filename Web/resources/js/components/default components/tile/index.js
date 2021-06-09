import React from 'react';
import {useHistory} from 'react-router-dom';

export default function Tile({title, illustration, path}) {
    const history = useHistory()
    return (
        <button className="tile" onClick={() => history.push(path)}>
            <img src={'/images/illustrations/' + illustration} alt=""/>
            <h1>{title}</h1>
        </button>
    )
}
