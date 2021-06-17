import React, {useEffect, useState} from 'react';
import UserApi from "../../../../api/UserApi";

export default function Topnavigation() {
    const [userDropdown, setUserDropdown] = useState(false);
    const {user, logoutUser} = UserApi();

    return (
        <>
            <div className="topnavigation">
                <h1>TeamStopcontact Admin</h1>
                <div className="usercontent" onClick={() => setUserDropdown(!userDropdown)}>
                    <div className="useravatar"/>
                    <div className="info">
                        <h1>{user?.name}</h1>
                        <p>{user?.email}</p>
                    </div>
                </div>
            </div>
            {userDropdown ?
                <div className="userDropdown">
                    <h1>{user?.name}</h1>
                    <p>{user?.email}</p>
                    <div className="btns">
                        <button className={'btn'} onClick={() => logoutUser()}>Uitloggen</button>
                    </div>
                </div>
            : null }
        </>
    )
}
