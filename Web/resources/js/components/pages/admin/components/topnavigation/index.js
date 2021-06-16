import React, {useEffect} from 'react';
import UserApi from "../../../../api/UserApi";

export default function Topnavigation() {

    const {user} = UserApi();

    return (
        <div className="topnavigation">
            <h1>TeamStopcontact Admin</h1>
            <div className="usercontent">
                <div className="useravatar"/>
                <div className="info">
                    <h1>{user?.name}</h1>
                    <p>{user?.email}</p>
                </div>
            </div>
        </div>
    )
}
