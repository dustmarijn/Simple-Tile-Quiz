import React, {useEffect, useState} from 'react';

// Api Provider's die kunnen worden gebruikt.
import UserApi from "../../../../api/UserApi";
import NotificationApi from "../../../../api/NotificationApi";

// Handige componenten die kunnen worden gebruikt.
import Menu from "./menu";
import UserContent from "./usercontent";
import UserDropdown from "./userdropdown";

/**
 * Deze functie laat de bovenste balk in de admin zien. Deze admin zorgt ervoor
 * dat je de naam van de admin, de sidebar breeder of smaller kan maken en op je
 * account kan klikken.
 */
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
                    <Menu setMenu={setMenu} menu={menu}/>
                    <h1>TeamStopcontact</h1>
                </div>
                <UserContent setUserDropdown={setUserDropdown} userDropdown={userDropdown} username={username}/>
            </div>
            <UserDropdown userDropdown={userDropdown} user={user} logoutUser={logoutUser}/>
        </>
    )
}
