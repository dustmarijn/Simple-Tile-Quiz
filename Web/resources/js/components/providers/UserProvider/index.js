import React, {createContext, useEffect, useState} from 'react';
import axios from "axios";
import Authentication from "../../pages/admin/authentication";

export const UserContext = createContext();

export default function UserProvider({children}) {
    const [user, setUser] = useState(undefined);
    const [adminRights, setAdminRights] = useState(false);

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if(user?.role === 'admin') {
            setAdminRights(!adminRights);
        }
    }, [user !== undefined]);

    function getUser() {
        if (localStorage.getItem('auth_token') !== '' || localStorage.getItem('auth_token') !== undefined) {
            let csrf = '';
            for (let meta of document.getElementsByTagName('meta')) {
                if(meta.getAttribute('csrf-token')) {
                    csrf = meta.getAttribute('content');
                }
            }
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('auth_token'),
                    'X-CSRF-TOKEN': csrf,
                }
            };
            axios.get('/api/user', config)
                .then(response => {
                    setUser(response.data.user);
                })
                .catch(response => {
                    setUser(null);
                });
        }
    }


    return (
        <UserContext.Provider value={{user, setUser, getUser, adminRights, setAdminRights}}>
            {adminRights ?
                <>
                    {children}
                </>
            : <Authentication adminRights={adminRights} setAdminRights={setAdminRights} user={user} setUser={setUser}/>}
        </UserContext.Provider>
    )

}
