import React from 'react';

export default function Topnavigation({user}) {
    return (
        <div className="topnavigation">
            <h1>TeamStopcontact Admin</h1>
            <div className="usercontent">
                <div className="useravatar"/>
                <div className="info">
                    <h1>{user.name}</h1>
                    <p>{user.email}</p>
                </div>
            </div>
        </div>
    )
}
