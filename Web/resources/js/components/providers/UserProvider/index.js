import React, {createContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from "axios";

export const UserContext = createContext();

// Handige componenten die kunnen worden gebruikt.
import Authentication from "../../pages/admin/authentication";

// Api Provider's die kunnen worden gebruikt.
import NotificationApi from "../../api/NotificationApi";

/**
 * Deze functie is een provider. Deze provider kan overal in de app worden gebruikt
 * Deze provider zorgt er voor dat je de ingelogde gebruiker kan laten zien. Zo kun
 * je checken of je in de admin kan gaan of geen toegang hebt tot de admin.
 */
export default function UserProvider({children}) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(undefined);
    const [adminRights, setAdminRights] = useState(false);

    const {dispatch} = NotificationApi();
    const history = useHistory();

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if(user?.role === 'admin') {
            setAdminRights(!adminRights);
        }
    }, [user !== undefined]);


    /**
     * Deze functie logt de gebruiker uit.
     */
    function logoutUser() {
        localStorage.setItem('auth_token', '');
        history.push('/admin');
        setAdminRights(false);
        axios.get('/api/logout')
            .then(response => {
            })
            .catch(error => {

            })
    }

    /**
     * Deze functie haalt de ingelogde gebruiker op.
     */
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
            {adminRights ?
                <>{children}</>
            :
                <Authentication adminRights={adminRights} setAdminRights={setAdminRights} user={user} setUser={setUser}/>
            }
        </UserContext.Provider>
    )
}
