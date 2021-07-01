import React, {useState} from 'react';
import axios from "axios";

// Handige componenten die worden ingeladen.
import Logo from "../../../default components/logo";
import LoadSpinner from "../components/loadspinner";

// Api Provider's die worden gebruikt.
import NotificationApi from "../../../api/NotificationApi";
import UserApi from "../../../api/UserApi";

/**
 * Deze functie / component zorgt ervoor dat niemand zonder admin rechten
 * en authenticatie met admin rechten de admin kan betreden.
 */
export default function Authentication({setAdminRights, setUser}) {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const {dispatch} = NotificationApi();
    const {loading, setLoading, logoutUser} = UserApi();

    function handleAuthentication(e) {
        e.preventDefault()
        setLoading(true);
        if(email && password) {
            axios.post('/api/login', {
                email: email,
                password: password
            })
                .then(response => {
                    if(response.data.message === 'Succes' && response.data.user.role === 'admin') {
                        setUser(response.data.user);
                        localStorage.setItem('auth_token', response.data.token);
                        setLoading(false);
                        setAdminRights(true);
                        dispatch({
                            type: 'ADD_NOTIFICATION',
                            payload: {
                                id: Date.now(),
                                type: 'succes',
                                message: 'U bent nu ingelogd!',
                            }
                        });
                    }
                })
                .catch(error => {
                    console.error(error);
                    setLoading(false);
                    logoutUser();
                    dispatch({
                        type: 'ADD_NOTIFICATION',
                        payload: {
                            id: Date.now(),
                            type: 'error',
                            message: 'Het e-mail of wachtwoord zijn onjuist!',
                        }
                    });
                })
        } else {
            setLoading(false);
            dispatch({
                type: 'ADD_NOTIFICATION',
                payload: {
                    id: Date.now(),
                    type: 'error',
                    message: 'U heeft geen e-mail of wachtwoord opgegeven!',
                }
            });
        }
    }

    function handleInput(e) {
        if(e[1] === 'email') {
            setEmail(e[0]);
        }
        if(e[1] === 'password') {
            setPassword(e[0]);
        }
    }

    return (
        <div className="underlayer">
            <img src={'/images/admin-background.png'} alt={''}/>
            <div className="overlayer"/>
            <div className="authentication">
                <Logo className={'logo'}/>
                <form method={'post'} onSubmit={(e) => handleAuthentication(e)}>
                    <h1>Welkom</h1>
                    <p>{loading ? 'Aan het laden ...' : 'Meld je aan voor de admin'}</p>
                    {!loading ?
                        <>
                            <label>
                                <p>E-mail adres</p>
                                <input type={'email'} placeholder={'E-mail adres'} onChange={(e) => handleInput([e.target.value, e.target.type])}/>
                            </label>
                            <label>
                                <p>Wachtwoord</p>
                                <input type={'password'} placeholder={'Wachtwoord'} onChange={(e) => handleInput([e.target.value, e.target.type])}/>
                            </label>
                            <button type={'submit'}>Aanmelden</button>
                        </>
                    :
                        <LoadSpinner text={'Bezig met aanmelden ...'}/>
                    }
                </form>
            </div>
        </div>
    )
}
