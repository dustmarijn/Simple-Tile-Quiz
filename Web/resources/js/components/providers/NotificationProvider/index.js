import React, {useReducer, createContext, useState} from 'react';
import Notification from "../../pages/admin/components/notification";

export const NotificationContext = createContext();

export default function NotificationProvider(props) {
    const [menu, setMenu] = useState(true);
    const [pageTitle, setPageTitle] = useState('');
    const {children} = props;
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
