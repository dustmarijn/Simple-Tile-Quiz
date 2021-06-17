import React, {useReducer, createContext} from 'react';
import Notification from "../../pages/admin/components/notification";

export const NotificationContext = createContext();

export default function NotificationProvider(props) {
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
        <NotificationContext.Provider value={{dispatch}}>
            <div className={'notifications-wrapper'}>
                {state.map(note => {
                    return <Notification dispatch={dispatch} key={note.id} {...note}/>
                })}
            </div>
            {children}
        </NotificationContext.Provider>
    )
}
