import React, {useState, useEffect} from 'react';
import './index.scss';

export default function Notification(props) {
    const [exit, setExit] = useState(false);
    const {message, type, id} = props;
    const [width, setWidth] = useState(0);
    const [intervalID, setIntervalID] = useState(null);

    function handleStartTimer() {
        const id = setInterval(() => {
            setWidth((prev) => {
                if (prev < 200) {
                    return prev + 0.5;
                }
                return prev;
            })
        }, 20);
        setIntervalID(id);
    }

    function handlePauseTimer() {
        clearInterval(intervalID);
    }

    useEffect(() => {
        handleStartTimer();
    }, []);

    useEffect(() => {
        if(width === 200) {
            handleCloseNotification();
        }
    }, [width]);

    function handleCloseNotification() {
        setExit(true);
        setTimeout(() => {
            props.dispatch({
                type: "REMOVE_NOTIFICATION",
                id: props.id
            })
        }, 275);
    }

    return (
        <div onMouseEnter={handlePauseTimer} onMouseLeave={handleStartTimer} key={id} className={`notification ${type} ${exit ? 'exit' : 'enter'}`}>
            <div className="icon-note">
                !
            </div>
            <p>{message}</p>
        </div>
    )
}

