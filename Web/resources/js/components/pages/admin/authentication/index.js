import React, {useState} from 'react';
import Logo from "../../../default components/logo";
import axios from "axios";

export default function Authentication({adminRights, setAdminRights, user, setUser}) {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    function handleAuthentication(e) {
        e.preventDefault()
        if(email && password) {
            axios.post('/api/login', {
                email: email,
                password: password
            })
                .then(response => {
                    if(response.data.message === 'Succes' && response.data.user.role === 'admin') {
                        setUser(response.data.user);
                        localStorage.setItem('auth_token', response.data.token);
                        setAdminRights(true);
                    }
                })
                .catch(error => {
                    console.error(error);
                })
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
                    <p>Meld je aan voor de admin</p>
                    <label>
                        <p>E-mail adres</p>
                        <input type={'email'} placeholder={'E-mail adres'} onChange={(e) => handleInput([e.target.value, e.target.type])}/>
                    </label>
                    <label>
                        <p>Wachtwoord</p>
                        <input type={'password'} placeholder={'Wachtwoord'} onChange={(e) => handleInput([e.target.value, e.target.type])}/>
                    </label>
                    <button type={'submit'}>Aanmelden</button>
                </form>
            </div>
        </div>
    )
}
