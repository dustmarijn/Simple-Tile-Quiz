import React, {useState, useEffect} from 'react';
import axios from "axios";

// Styles die worden ingeladen.
import './index.scss';

// Handige componenten die kunnen worden gebruikt.
import Alert from "../../alert";
import AdminPage from "../../components/adminpage";
import LoadSpinner from "../../components/loadspinner";

// Api Provider's die kunnen worden gebruikt.
import NotificationApi from "../../../../api/NotificationApi";


/**
 * Deze functie toont de hele organisaties pagina in de admin.
 * Deze bevat meerdere functies die ook worden beschreven.
 */
export default function Organisations() {
    const [loading, setLoading] = useState(true);
    const [organisations, setOrganisations] = useState([]);
    const [filteredOrgs, setFilteredOrgs] = useState([]);
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

    const {dispatch, setPageTitle} = NotificationApi();

    /**
     * Hier worden alle organisaties ingeladen.
     * Ook wordt hier de titel van de pagina gezet naar 'organisaties'
     */
    useEffect(() => {
        getOrganisations();
        var url = window.location.href;
        var part = url.substring(url.lastIndexOf('/') + 1);
        setPageTitle(part);
    }, []);

    /**
     * Deze functie wordt uitgevoerd op het moment dat een input value veranderd in de formulieren.
     * Dit zorgt ervoor dat bepaalde states worden geupdate.
     */
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

    /**
     * Deze functie haalt alle organisaties op. Ook zorgt deze functie er voor
     * dat alle states worden geleegd die nodig zijn om een formulier in te vullen.
     */
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
                setFilteredOrgs(response.data.organisations);
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

    /**
     * Deze functie zorgt er voor dat wanneer een formulier wordt ingevuld er een nieuwe
     * organisatie wordt aangemaakt. Mits deze de juiste informatie heeft.
     */
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

    /**
     * Deze functie zorgt er voor dat wanneer er een organisatie wordt aangepast
     * deze daar mee handeld. Alle informatie die is meegegeven wordt dan in de
     * database bewerkt. Niet alle velden zijn verplicht.
     */
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

    /**
     * Deze functie zorgt er voor dat een organisatie kan worden verwijderd.
     */
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


    /**
     * Deze functie zorgt ervoor dat je kan zoeken naar organisatie(s).
     */
    function handleSearch(text) {
        const searchedOrg = organisations?.filter(org => org.name.toLowerCase().includes(text.toLowerCase()));
        if(searchedOrg) {
            setFilteredOrgs(searchedOrg);
        }
    }


    return (
        <AdminPage>
                {alert ?
                    <Alert alertMSG={alertMSG}/>
                : null}
                <>
                    {loading === false ?
                        <div className="topitems">
                            <button className={`new-org-btn ${newOrg ? 'not-use' : ''}`} onClick={() => {
                                setNewOrg(true);
                                setTimeout(() => {
                                    document.getElementsByClassName(`newOrg`)[0].scrollIntoView({block: 'nearest'});
                                }, 150);
                            }}><img src={'/images/plus.svg'} alt={''}/> Nieuwe organisatie</button>
                            <div className="search">
                                <img src={'/images/search.svg'} alt={''}/>
                                <input type={'search'} placeholder={'Zoeken naar organisatie ...'} onChange={(e) => handleSearch(e.target.value)} />
                            </div>
                        </div>
                    : null}
                    <div className="pages orgs">
                    {loading === false ?
                        <>
                            {filteredOrgs.length > 0 ?
                                <>
                                    {filteredOrgs?.map((org, index) => {
                                        return (
                                            <div className={`page organisation ${deleting === org.id ? 'shake' : ''} ${editOrg === org.id ? 'editing' : ''}`} key={index}>
                                                {editOrg !== org.id ?
                                                    <>
                                                        <img src={'/images/organisationlogo/' + org.logo_file_name} alt={''}/>
                                                        <button className={'btn save mg-top'} onClick={() => {setEditOrg(org.id);setOrgID(org.id);handleSearch(org.name)}}>Bewerken</button>
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
                                                            <button className={'btn'} onClick={() => {setEditOrg(false);handleSearch('')}}>Annuleren</button>
                                                        </div>
                                                    </form>
                                                }
                                            </div>
                                        )
                                    })}
                                </>
                            : <p className={'not-found'}>Geen organisatie gevonden.</p>}
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
                        <LoadSpinner text={'Organisaties worden opgehaald ...'}/>
                    }
                    </div>
                </>
        </AdminPage>
    )
}
