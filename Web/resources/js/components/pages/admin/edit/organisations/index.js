import React, {useState, useEffect} from 'react';
import AdminPage from "../../components/adminpage";
import axios from "axios";
import NotificationApi from "../../../../api/NotificationApi";

import './index.scss';

export default function Organisations() {
    const [loading, setLoading] = useState(true);
    const [organisations, setOrganisations] = useState([]);
    const [newOrg, setNewOrg] = useState(false);
    const [name, setName] = useState(null);
    const [image, setImage] = useState(null);
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);
    const [location, setLocation] = useState(null);
    const [website, setWebsite] = useState(null);
    const [editOrg, setEditOrg] = useState(false);
    const [orgID, setOrgID] = useState(null);
    const [alert, setAlert] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [alertMSG, setAlertMSG] = useState({
        title: 'Bericht',
        description: 'Beschrijving van bericht',
        actionOK: null,
        actionOKMessage: 'Oké',
        actionCancel: null,
        actionCancelMessage: 'Annuleren',
    });

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
        setEditOrg(false);
        setName(null);
        setPhone(null);
        setEmail(null);
        setLocation(null);
        setWebsite(null);
        setOrgID(null);
        axios.get('/api/organisations')
            .then(response => {
                setOrganisations(response.data.organisations);
                setLoading(false);
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
        setLoading(true);
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
                setLoading(false);
                setEditOrg(false);
                setName(null);
                setPhone(null);
                setEmail(null);
                setLocation(null);
                setWebsite(null);
                setOrgID(null);
            })
    }


    function handleEditOrg(e) {
        e.preventDefault();
        setLoading(true);
        console.log(e);
        dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
                id: Date.now(),
                type: 'succes',
                message: `Organisatie wordt aangepast ...`,
            }
        });
        const formData = new FormData();
        formData.append('logo_file_name', image);
        formData.append('id', orgID);
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('location', location);
        formData.append('website', website);

        axios.post('/api/editOrganisation', formData)
            .then(response => {
                getOrganisations();
                dispatch({
                    type: 'ADD_NOTIFICATION',
                    payload: {
                        id: Date.now(),
                        type: 'succes',
                        message: `Organisatie is succesvol aangepast!`,
                    }
                });
            })
            .catch(error => {
                dispatch({
                    type: 'ADD_NOTIFICATION',
                    payload: {
                        id: Date.now(),
                        type: 'error',
                        message: `Er is iets mis gegaan bij het bewerken.`,
                    }
                });
                setLoading(false);
                setEditOrg(false);
                setName(null);
                setPhone(null);
                setEmail(null);
                setLocation(null);
                setWebsite(null);
                setOrgID(null);
            })
    }

    function handleDeleteOrg(org) {
        console.log(org);
        dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
                id: Date.now(),
                type: 'succes',
                message: `Bezig met verwijderen ...`,
            }
        });
        setLoading(true);
        axios.post('/api/deleteOrganisation', {
            id: org.id,
        })
            .then(response => {
                console.log(response);
                getOrganisations();
                dispatch({
                    type: 'ADD_NOTIFICATION',
                    payload: {
                        id: Date.now(),
                        type: 'succes',
                        message: `De organisatie '${org.name}' is verwijderd!`,
                    }
                });
            })
            .catch(error => {
                console.error(error);
                dispatch({
                    type: 'ADD_NOTIFICATION',
                    payload: {
                        id: Date.now(),
                        type: 'error',
                        message: `Er is iets mis gegaan bij het verwijderen!`,
                    }
                });
            })
    }


    return (
        <AdminPage>
                {alert ?
                <div className="blackbox">
                    <div className="alert">
                        <h1>{alertMSG.title}</h1>
                        <p>{alertMSG.description}</p>
                        <div className="btns">
                            <button className={'btn save'}
                                    onClick={alertMSG.actionOK}>{alertMSG.actionOKMessage}</button>
                            <button className={'btn'}
                                    onClick={alertMSG.actionCancel}>{alertMSG.actionCancelMessage}</button>
                        </div>
                    </div>
                </div>
                : null}
                <>
                    {loading === false ?
                        <button className={`new-org-btn ${newOrg ? 'not-use' : ''}`} onClick={() => {
                            setNewOrg(true);
                            setTimeout(() => {
                                document.getElementsByClassName(`newOrg`)[0].scrollIntoView({block: 'nearest'});
                            }, 150);
                        }}><img src={'/images/plus.svg'} alt={''}/> Nieuwe organisatie</button>
                    : null}
                    <div className="pages">
                    {loading === false ?
                        <>
                            {organisations.map((org, index) => {
                                return (
                                    <div className={`page ${deleting === org.id ? 'shake' : ''}`} key={index}>
                                        {editOrg !== org.id ?
                                            <>
                                                <img src={'/images/organisationlogo/' + org.logo_file_name} alt={''}/>
                                                <button className={'btn save mg-top'} onClick={() => {setEditOrg(org.id);setOrgID(org.id)}}>Bewerken</button>
                                                <h1>{org.name}</h1>
                                                <p>Telefoon nummer: <span>{org.phone_number}</span></p>
                                                <p>E-mail adres: <span>{org.email}</span></p>
                                                <p>locatie adres: <span>{org.location}</span></p>
                                                <p>Website: <span className={'website'} onClick={() => window.open(org.website)}>{org.website}</span></p>
                                                <img onClick={() => {
                                                    setAlert(true);
                                                    setDeleting(org.id);
                                                    setAlertMSG({
                                                        title: 'Organisatie verwijderen?',
                                                        description: 'Als u deze organisatie verwijderd, worden alle tiles van deze organisatie verwijderd, weet u het zeker?',
                                                        actionOK: () => {
                                                            setAlert(false);
                                                            setDeleting(false);
                                                            handleDeleteOrg(org)
                                                        },
                                                        actionOKMessage: 'Ja, verwijderen',
                                                        actionCancel: () => {
                                                            setAlert(false);
                                                            setDeleting(false);
                                                            setAlertMSG({})
                                                        },
                                                        actionCancelMessage: 'Nee, annuleren',
                                                    })
                                                }} className={'delete-org'} src={'/images/trash-alt-solid.svg'} alt={''}/>

                                            </>
                                            :
                                            <form method={'post'} onSubmit={(e) => handleEditOrg(e)}>
                                                <h1>Bewerken van organisatie ({org.name})</h1>
                                                <p>De velden zijn niet verplicht om in te vullen.</p>
                                                <label>
                                                    <p>Logo organisatie:</p>
                                                    <input type={'file'} name={'logo'}
                                                           accept="image/png, image/gif, image/jpeg, image/svg+xml"
                                                           onChange={(e) => handleInput([e.target.files[0], e.target.name])}/>
                                                </label>
                                                <label>
                                                    <p>Naam organisatie:</p>
                                                    <input defaultValue={org.name} type={'text'} name={'name'} onChange={(e) => handleInput([e.target.value, e.target.name])} placeholder={'Naam van de organisatie'}/>
                                                </label>
                                                <label>
                                                    <p>Telefoon nummer:</p>
                                                    <input defaultValue={org.phone_number} type={'tel'} name={'phone'} onChange={(e) => handleInput([e.target.value, e.target.name])} placeholder={'Telefoon nummer van de organisatie'}/>
                                                </label>
                                                <label>
                                                    <p>E-mail adres:</p>
                                                    <input defaultValue={org.email} type={'email'} name={'email'} onChange={(e) => handleInput([e.target.value, e.target.name])} placeholder={'E-mail adres van de organisatie'}/>
                                                </label>
                                                <label>
                                                    <p>Adres organisatie:</p>
                                                    <input defaultValue={org.location} type={'text'} name={'adress'} onChange={(e) => handleInput([e.target.value, e.target.name])} placeholder={'Rodetorenplein 14, Zwolle'}/>
                                                </label>
                                                <label>
                                                    <p>Website organisatie:</p>
                                                    <input defaultValue={org.website} type={'text'} name={'website'} onChange={(e) => handleInput([e.target.value, e.target.name])} placeholder={'https://www.organisatie.nl/'}/>
                                                </label>
                                                <div className="btns">
                                                    <button className={'btn save'}>Opslaan</button>
                                                    <button className={'btn'} onClick={() => setEditOrg(false)}>Annuleren</button>
                                                </div>
                                            </form>
                                        }
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
                    </div>
                </>
        </AdminPage>
    )
}
