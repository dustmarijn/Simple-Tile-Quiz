import React, {useState, useEffect} from 'react';
import AdminPage from "../../components/adminpage";
import axios from "axios";
import NotificationApi from "../../../../api/NotificationApi";

import './index.scss';

export default function Organisations() {
    const [organisations, setOrganisations] = useState([]);
    const [newOrg, setNewOrg] = useState(false);
    const [name, setName] = useState(null);
    const [image, setImage] = useState(null);
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);
    const [location, setLocation] = useState(null);
    const [website, setWebsite] = useState(null);

    const {dispatch} = NotificationApi();

    useEffect(() => {
        getOrganisations();
    }, []);

    function handleInput(e) {
        if (e[1] === 'name') {
            setName(e[0]);
        }
        if (e[1] === 'phone') {
            setPhone(e[0]);
        }
        if (e[1] === 'email') {
            setEmail(e[0]);
        }
        if (e[1] === 'adress') {
            setLocation(e[0]);
        }
        if (e[1] === 'website') {
            setWebsite(e[0]);
        }
        if (e[1] === 'logo') {
            setImage(e[0]);
        }
    }

    function getOrganisations() {
        axios.get('/api/organisations')
            .then(response => {
                setOrganisations(response.data.organisations);
            })
            .catch(error => {
                dispatch({
                    type: 'ADD_NOTIFICATION',
                    payload: {
                        id: Date.now(),
                        type: 'error',
                        message: `Er is iets mis gegaan bij het ophalen van de organisaties!`,
                    }
                });
            })
    }

    function handleNewOrg(e) {
        e.preventDefault();
        console.log(e);
        dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
                id: Date.now(),
                type: 'succes',
                message: `Organisatie wordt aangemaakt ...`,
            }
        });
        const formData = new FormData();
        formData.append('logo_file_name', image);
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('location', location);
        formData.append('website', website);

        setNewOrg(false);

        axios.post('/api/createOrganisation', formData)
            .then(response => {
                getOrganisations();
                dispatch({
                    type: 'ADD_NOTIFICATION',
                    payload: {
                        id: Date.now(),
                        type: 'succes',
                        message: `Organisatie is succesvol aangemaakt!`,
                    }
                });
            })
            .catch(error => {
                dispatch({
                    type: 'ADD_NOTIFICATION',
                    payload: {
                        id: Date.now(),
                        type: 'error',
                        message: `Er is iets mis gegaan bij het aanmaken.`,
                    }
                });
            })
    }


    return (
        <AdminPage>
            <>
                <button className={`new-org-btn ${newOrg ? 'not-use' : ''}`} onClick={() => {
                    setNewOrg(true);
                    setTimeout(() => {
                        document.getElementsByClassName(`newOrg`)[0].scrollIntoView({block: 'nearest'});
                    }, 150);
                }}><img src={'/images/plus.svg'} alt={''}/> Nieuwe organisatie</button>
                <div className="pages">
                    {organisations.map((org, index) => {
                        return (
                            <div className="page" key={index}>
                                <img src={'/images/organisationlogo/' + org.logo_file_name} alt={''}/>
                                <h1>{org.name}</h1>
                                <p>Telefoon nummer: <span>{org.phone_number}</span></p>
                                <p>E-mail adres: <span>{org.email}</span></p>
                                <p>locatie adres: <span>{org.location}</span></p>
                                <p>Website: <span className={'website'} onClick={() => window.open(org.website)}>{org.website}</span></p>
                            </div>
                        )
                    })}
                    {newOrg ?
                        <div className="page newOrg" key={'wfeughgiyl74y4tirulfkg'}>
                            <h1>Nieuwe organisatie</h1>
                            <p>Vul alle onderstaande gegevens in om een nieuwe organisatie aan te maken.</p>
                            <form method={'post'} onSubmit={(e) => handleNewOrg(e)}>
                                <label>
                                    <p>Logo organisatie:</p>
                                    <input type={'file'} name={'logo'}
                                           accept="image/png, image/gif, image/jpeg, image/svg+xml"
                                           onChange={(e) => handleInput([e.target.files[0], e.target.name])}
                                           required/>
                                </label>
                                <label>
                                    <p>Naam organisatie:</p>
                                    <input type={'text'} name={'name'} onChange={(e) => handleInput([e.target.value, e.target.name])} placeholder={'Naam van de organisatie'} required/>
                                </label>
                                <label>
                                    <p>Telefoon nummer:</p>
                                    <input type={'tel'} name={'phone'} onChange={(e) => handleInput([e.target.value, e.target.name])} placeholder={'Telefoon nummer van de organisatie'} required/>
                                </label>
                                <label>
                                    <p>E-mail adres:</p>
                                    <input type={'email'} name={'email'} onChange={(e) => handleInput([e.target.value, e.target.name])} placeholder={'E-mail adres van de organisatie'} required/>
                                </label>
                                <label>
                                    <p>Adres organisatie:</p>
                                    <input type={'text'} name={'adress'} onChange={(e) => handleInput([e.target.value, e.target.name])} placeholder={'Rodetorenplein 14, Zwolle'} required/>
                                </label>
                                <label>
                                    <p>Website organisatie:</p>
                                    <input type={'text'} name={'website'} onChange={(e) => handleInput([e.target.value, e.target.name])} placeholder={'https://www.organisatie.nl/'} required/>
                                </label>
                                <div className="btns">
                                    <button className={'btn save'}>Aanmaken</button>
                                    <button className={'btn'} onClick={() => setNewOrg(false)}>Annuleren</button>
                                </div>
                            </form>
                        </div>
                    : null }
                </div>
            </>
        </AdminPage>
    )
}
