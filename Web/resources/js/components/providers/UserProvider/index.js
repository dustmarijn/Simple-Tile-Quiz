import React, {createContext, useEffect, useState} from 'react';
import axios from "axios";
import Authentication from "../../pages/admin/authentication";
import NotificationApi from "../../api/NotificationApi";
import AdminPage from "../../pages/admin/components/adminpage";

export const UserContext = createContext();

export default function UserProvider({children}) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(undefined);
    const [adminRights, setAdminRights] = useState(false);

    const {dispatch} = NotificationApi();

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if(user?.role === 'admin') {
            setAdminRights(!adminRights);
        }
    }, [user !== undefined]);


    function logoutUser() {
        localStorage.setItem('auth_token', '');
        window.location.href = '/logout';
    }

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
                    setLoading(false);
                    dispatch({
                        type: 'ADD_NOTIFICATION',
                        payload: {
                            id: Date.now(),
                            type: 'succes',
                            message: 'U bent nu ingelogd, gegevens waren opgeslagen.',
                        }
                    });
                })
                .catch(response => {
                    setUser(null);
                    setLoading(false);
                    dispatch({
                        type: 'ADD_NOTIFICATION',
                        payload: {
                            id: Date.now(),
                            type: 'succes',
                            message: 'U moet zich aanmelden om de admin te kunnen betreden.',
                        }
                    });
                });
        }
    }


    return (
        <UserContext.Provider value={{user, setUser, getUser, adminRights, setAdminRights, logoutUser, setLoading, loading}}>
            {loading === false ?
                <>
                    {adminRights ?
                        <>
                            {children}
                        </>
                        : <Authentication adminRights={adminRights} setAdminRights={setAdminRights} user={user} setUser={setUser}/>
                    }
                </>
            :
                <div className="loading">
                    <div className="lds-ring">
                        <div/>
                        <div/>
                        <div/>
                        <div/>
                    </div>
                    <h1>Bijna klaar ...</h1>
                </div>
            }
        </UserContext.Provider>
    )
}
