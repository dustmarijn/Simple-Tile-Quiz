import React, {useReducer, createContext, useState} from 'react';
export const NotificationContext = createContext();

// Handige componenten die kunnen worden gebruikt.
import Notification from "../../pages/admin/components/notification";

/**
 * Deze functie is een provider. Deze provider kan overal in de app worden gebruikt
 * Deze provider zorgt er voor dat je notificaties kan laten zien. Ook kan je hier
 * mee de sidebar van de admin breeder of smaller maken.
 */
export default function NotificationProvider(props) {
    const [menu, setMenu] = useState(true);
    const [pageTitle, setPageTitle] = useState('');
    const [state, dispatch] = useReducer((state, action) => {
        switch(action.type) {
            case "ADD_NOTIFICATION":
                return [...state, {...action.payload}];
            case "REMOVE_NOTIFICATION":
                return state.filter(el => el.id !== action.id);
            default:
                return state;
        }
    }, []);

    const {children} = props;

    return (
        <NotificationContext.Provider value={{dispatch, menu, setMenu, pageTitle, setPageTitle}}>
            <div className={'notifications-wrapper'}>
                {state.map(note => {
                    return <Notification dispatch={dispatch} key={note.id} {...note}/>
                })}
            </div>
            {children}
        </NotificationContext.Provider>
    )
}
