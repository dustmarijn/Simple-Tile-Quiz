import React, {useEffect, useState} from 'react';
import UserApi from "../../../../api/UserApi";
import NotificationApi from "../../../../api/NotificationApi";

export default function Topnavigation() {
    const [userDropdown, setUserDropdown] = useState(false);
    const {user, logoutUser} = UserApi();
    const [username, setUserName] = useState(null);

    const {menu, setMenu} = NotificationApi();

    useEffect(() => {
        const name = user?.name;
        const matches = name.match(/\b(\w)/g);
        setUserName(matches.join('').toUpperCase());
    }, [user !== undefined || user !== null]);

    return (
        <>
            <div className="topnavigation">
                <div className="title">
                    <div className="menu" onClick={() => setMenu(!menu)}>
                        <div className="line"/>
                        <div className="line"/>
                        <div className="line"/>
                    </div>
                    <h1>TeamStopcontact</h1>
                </div>
                <div className="usercontent" onClick={() => setUserDropdown(!userDropdown)}>
                    <div className="useravatar">
                        <p>{username}</p>
                        <div className="status"/>
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
