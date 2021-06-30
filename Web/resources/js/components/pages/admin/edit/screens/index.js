import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import AdminPage from "../../components/adminpage";
import axios from "axios";


import './index.scss';
import Tile from "../../../../default components/tile";
import NotificationApi from "../../../../api/NotificationApi";
import Alert from "../../alert";

export default function Screens() {
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState([]);
    const [organisations, setOrganisations] = useState([]);
    const [popup, setPopup] = useState('');
    const [editPage, setEditPage] = useState('');
    const [alert, setAlert] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [findOrganisation, setFindOrganisation] = useState(false);
    const [selectedOrganisation, setSelectedOrganisation] = useState(null);
    const [pageType, setPageType] = useState(null);
    const [filteredPage, setFilteredPage] = useState([]);

    const [alertMSG, setAlertMSG] = useState({
        title: 'Bericht',
        description: 'Beschrijving van bericht',
        actionOK: null,
        actionOKMessage: 'Oké',
        actionCancel: null,
        actionCancelMessage: 'Annuleren',
    });
    const [editTile, setEditTile] = useState(null);

    const {dispatch, pageTitle, setPageTitle} = NotificationApi();

    const [title, setTitle] = useState(null);
    const [path, setPath] = useState(null);
    const [image, setImage] = useState(null);
    const [pageID, setPageID] = useState(null);
    const [tileID, setTileID] = useState(null);

    useEffect(() => {
        getPages();
        getOrganisations();
        var url = window.location.href;
        var part = url.substring(url.lastIndexOf('/') + 1);
        setPageTitle(part);
    }, []);

    function getPages() {
        setTitle(null);
        setPath(null);
        setImage(null);
        setPageID(null);
        setEditTile(null);
        setEditPage(null);
        setPopup(null);
        setTileID(null);
        setPageType(null);
        setSelectedOrganisation(null);
        setFindOrganisation(null);
        setPageID(null);
        setSelectedOrganisation(null);
        setFindOrganisation(null);
        setPageID(null);
        setPageType(null);
        axios.get('/api/pages')
            .then(response => {
                if (response.data.pages) {
                    setPages(response.data.pages);
                    setFilteredPage(response.data.pages);
                    setLoading(false);
                }

                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
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

    function handleOrgTile() {
        if(selectedOrganisation !== null) {
            const organisation = organisations.filter(org => org.id === selectedOrganisation)[0];
            dispatch({
                type: 'ADD_NOTIFICATION',
                payload: {
                    id: Date.now(),
                    type: 'succes',
                    message: `Aanmaken van organisatie tegel ...`,
                }
            });
            if (organisation) {
                const formData = new FormData();
                formData.append('title', organisation.name);
                const getPage = pages?.find(page => parseInt(page.id) === parseInt(pageID));
                if(getPage) {
                    if(getPage?.path !== '/') {
                        formData.append('path', getPage.path + '/' + organisation.name.toLowerCase());
                    } else {
                        formData.append('path', '/' + organisation.name.toLowerCase());
                    }
                }
                formData.append('illustration_file_name', organisation.logo_file_name);
                formData.append('page_id', pageID);

                setLoading(true);

                axios.post('/api/createTile', formData)
                    .then(response => {
                        setPopup('');
                        dispatch({
                            type: 'ADD_NOTIFICATION',
                            payload: {
                                id: Date.now(),
                                type: 'succes',
                                message: `De keuze tegel '${organisation.name}' is aangemaakt!`,
                            }
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                        dispatch({
                            type: 'ADD_NOTIFICATION',
                            payload: {
                                id: Date.now(),
                                type: 'error',
                                message: `Er is iets mis gegaan bij het aanmaken!`,
                            }
                        });
                    });
                const pageFormData = new FormData();
                pageFormData.append('title', organisation.name);
                pageFormData.append('type', pageType);
                if(getPage) {
                    if(getPage?.path !== '/') {
                        pageFormData.append('path', getPage.path + '/' + organisation.name.toLowerCase());
                    } else {
                        pageFormData.append('path', '/' + organisation.name.toLowerCase());
                    }
                }
                axios.post('/api/createPage', pageFormData)
                    .then(response => {
                        console.log(response);
                        getPages();
                    })
                    .catch(error => {
                        console.error(error);
                        getPages();
                    })
            }
        }
    }

    function handleNewTile(e) {
        e.preventDefault();
        if (title !== null && image !== null) {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('illustration_file_name', image);
            const getPage = pages?.find(page => parseInt(page.id) === parseInt(pageID));
            if(getPage) {
                if(getPage?.path !== '/') {
                    formData.append('path', getPage.path + '/' + title.toLowerCase());
                } else {
                    formData.append('path', '/' + title.toLowerCase());
                }
            }

            formData.append('page_id', pageID);

            dispatch({
                type: 'ADD_NOTIFICATION',
                payload: {
                    id: Date.now(),
                    type: 'succes',
                    message: `Aanmaken van tegel ...`,
                }
            });
            setLoading(true);
            axios.post('/api/createTile', formData)
                .then(response => {
                    setPopup('');
                    getPages();
                    dispatch({
                        type: 'ADD_NOTIFICATION',
                        payload: {
                            id: Date.now(),
                            type: 'succes',
                            message: `De keuze tegel '${title}' is aangemaakt!`,
                        }
                    });
                })
                .catch((error) => {
                    console.error(error);
                    getPages();
                    dispatch({
                        type: 'ADD_NOTIFICATION',
                        payload: {
                            id: Date.now(),
                            type: 'error',
                            message: `Er is iets mis gegaan bij het aanmaken!`,
                        }
                    });
                });

            axios.post('/api/createPage', formData)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.error(error);
                })
        } else {
            console.error(image);
            console.error('error');
        }
    }

    function handleInput(e) {
        if (e[1] === 'title') {
            setTitle(e[0]);
        }
        if (e[1] === 'path') {
            setPath(e[0]);
        }
        if (e[1] === 'illustration') {
            setImage(e[0]);
        }
    }

    function handleDeleteTile(tile) {
        dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
                id: Date.now(),
                type: 'succes',
                message: `Bezig met verwijderen ...`,
            }
        });
        setLoading(true);
        axios.post('/api/deleteTile', {
            id: tile.id,
            page_id: tile.page_id,
        })
            .then(response => {
                console.log(response);
                getPages();
                dispatch({
                    type: 'ADD_NOTIFICATION',
                    payload: {
                        id: Date.now(),
                        type: 'succes',
                        message: `De keuze tegel '${tile.title}' is verwijderd!`,
                    }
                });
            })
            .catch(error => {
                console.error(error);
                getPages();
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

    function handleEditTile(e) {
        handleEditPage(e);
    }

    function handleEditPage(e) {
        e.preventDefault();
        dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
                id: Date.now(),
                type: 'succes',
                message: `Bezig met opslaan ...`,
            }
        });
        const formData = new FormData();
        formData.append('title', title);
        const getPage = pages?.find(page => parseInt(page.id) === parseInt(pageID));

        if(getPage) {
            if(getPage?.path !== '/') {
                let lastPartUrl = getPage.path.substr(getPage.path.lastIndexOf('/') - 1);
                formData.append('path', `${lastPartUrl.path !== undefined ? lastPartUrl.path : '' }` + '/' + title.toLowerCase());
            } else {
                if(tileID) {
                    const getPage = pages?.find(page => parseInt(page.id) === parseInt(tileID));
                    if(getPage?.path !== '/') {
                        let lastPartUrl = getPage.path.substr(getPage.path.lastIndexOf('/') - 1);
                        formData.append('path', `${lastPartUrl.path !== undefined ? lastPartUrl.path : '' }` + '/' + title.toLowerCase());
                    } else {
                        formData.append('path', '/' + title.toLowerCase());
                    }
                }
            }
        }
        formData.append('illustration_file_name', image);
        formData.append('page_id', pageID ? pageID : null);
        formData.append('tile_id', tileID ? tileID : null);

        setLoading(true);

        axios.post('/api/editPage', formData)
            .then(response => {
                setEditPage('');
                setPopup('');
                setTileID(null);
                setPageID(null);
                getPages();
                dispatch({
                    type: 'ADD_NOTIFICATION',
                    payload: {
                        id: Date.now(),
                        type: 'succes',
                        message: `Bewerkingen zijn opgeslagen!`,
                    }
                });
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
                getPages();
                dispatch({
                    type: 'ADD_NOTIFICATION',
                    payload: {
                        id: Date.now(),
                        type: 'error',
                        message: 'Er is iets mis gegaan bij het bewerken!',
                    }
                });
            })
    }


    function handleDisableTile(tile) {
        dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
                id: Date.now(),
                type: 'succes',
                message: `Bezig met opslaan ...`,
            }
        });
        axios.post('/api/ableToUseTile', {
            able_to_use: tile.able_to_use === 'disable' ? '0' : '1',
            tile_id: tile.tile_id,
        })
            .then(response => {
                getPages();
                dispatch({
                    type: 'ADD_NOTIFICATION',
                    payload: {
                        id: Date.now(),
                        type: 'succes',
                        message: `De keuze tegel is nu ${response.data?.disabled !== '' ? 'niet te gebruiken.' : 'wel te gebruiken.'}`,
                    }
                });
            })
            .catch(error => {
                getPages();
                dispatch({
                    type: 'ADD_NOTIFICATION',
                    payload: {
                        id: Date.now(),
                        type: 'error',
                        message: `Er is iets mis gegaan!`,
                    }
                });
            })
    }


    function handleSearch(text) {
        const searchedPage = pages?.filter(page => page.title.toLowerCase().includes(text.toLowerCase()));
        if(searchedPage) {
            setFilteredPage(searchedPage);
        }
    }


    return (
        <AdminPage>
            {alert ?
                <Alert alertMSG={alertMSG} />
                : null}
                {loading === false ?
                    <div className="topitems">
                        <div className="search margin-left-null">
                            <img src={'/images/search.svg'} alt={''}/>
                            <input type={'search'} placeholder={'Zoeken naar pagina\'s ...'} onChange={(e) => handleSearch(e.target.value)} />
                        </div>
                    </div>
                : null}
            <div className="pages">
                {loading === false ?
                    filteredPage.length > 0 ?
                    <>
                        {filteredPage?.map((page, index) => {
                            if(page.type !== 'organisation') {
                                return (
                                    <div
                                        className={`page ${page.title.replace(/\s+/g, '-').toLowerCase()} ${page.able_to_use === '0' ? 'disabled' : 'enabled'}`}
                                        key={index}>
                                        <h1>{page.title}</h1>
                                        <p className={'path'}>Pad naar het scherm: <span>{page.path}</span></p>
                                        {page.able_to_use !== '0' ?
                                            <>
                                                <button className={'btn save mg-top'} onClick={() => {
                                                    setEditPage(page.id);
                                                    setEditTile(null);
                                                    setPageID(page.id);
                                                    setTileID(null);
                                                }}>Bewerken
                                                </button>
                                                {findOrganisation === page.id ?
                                                    <div className="find-organisations">
                                                        <h1>Organisaties</h1>
                                                        <p>Kies een organisatie en deze wordt weer gegeven als een
                                                            tegel.</p>
                                                        <div className="organisations">
                                                            {organisations?.map((org, index) => {
                                                                return (
                                                                    <div
                                                                        className={`tile ${selectedOrganisation === org.id ? 'selected' : ''}`}
                                                                        key={index} onClick={() => {
                                                                        setPageID(page.id);
                                                                        setSelectedOrganisation(org.id);
                                                                        setPageType('organisation');
                                                                    }}>
                                                                        <img
                                                                            src={'/images/organisationlogo/' + org.logo_file_name}
                                                                            alt={''}/>
                                                                        <h1>{org.name}</h1>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                        <div className="btns">
                                                            <button
                                                                className={`btn ${selectedOrganisation ? 'use' : 'not-use'} save`}
                                                                onClick={() => handleOrgTile()}>Tegel gebruiken
                                                            </button>
                                                            <button className={'btn'} onClick={() => {
                                                                setFindOrganisation(null);
                                                                setSelectedOrganisation(null);
                                                                setPageID(null);
                                                                setPageType(null);
                                                            }}>Annuleren
                                                            </button>
                                                        </div>
                                                    </div>
                                                    : null}
                                                <p className={'give-tiles'}>Keuze tegels die bij dit scherm horen:</p>
                                                <div className="tiles">
                                                    {page.tiles.map((tile, num) => {
                                                        return (
                                                            <div className="edit-tile" key={num}>
                                                                <div className="edit-items">
                                                                    {organisations?.filter(org => org.name !== tile.title).length >= 1 ?
                                                                        <div className="edit-item" onClick={() => {
                                                                            setPopup(page.id);
                                                                            setEditPage(null);
                                                                            setEditTile({
                                                                                title: tile.title,
                                                                                path: tile.path,
                                                                            });
                                                                            setTileID(tile.id);
                                                                            setPageID(null);
                                                                        }}>
                                                                            <p>Tegel aanpassen</p>
                                                                            <img src={'/images/pen-solid.svg'} alt={''}/>
                                                                        </div>
                                                                    : null }
                                                                    <div className="edit-item"
                                                                         onClick={() => handleDisableTile({
                                                                             tile_id: tile.id,
                                                                             able_to_use: tile.able_to_use !== '0' ? 'disable' : 'enable',
                                                                         })}>
                                                                        <p>{tile.able_to_use !== '0' ? "Tegel uitzetten" : "Tegel aanzetten"}</p>
                                                                        <img
                                                                            src={tile.able_to_use !== '0' ? '/images/disable.svg' : '/images/enable.svg'}
                                                                            alt={''}/>
                                                                    </div>
                                                                    <div className="edit-item remove" onClick={() => {
                                                                        setAlert(true);
                                                                        setDeleting(tile.id);
                                                                        setAlertMSG({
                                                                            title: 'Keuze tegel verwijderen?',
                                                                            description: 'Als u deze keuze tegel verwijderd, worden alle onderliggende pagina\'s ook verwijderd. Weet u het zeker?',
                                                                            actionOK: () => {
                                                                                setAlert(false);
                                                                                handleDeleteTile(tile)
                                                                            },
                                                                            actionOKMessage: 'Ja, verwijderen',
                                                                            actionCancel: () => {
                                                                                setAlert(false);
                                                                                setDeleting(false);
                                                                                setAlertMSG({})
                                                                            },
                                                                            actionCancelMessage: 'Nee, annuleren',
                                                                        })
                                                                    }}>
                                                                        <p>Verwijderen</p>
                                                                        <img src={'/images/trash-alt-solid.svg'}
                                                                             alt={''}/>
                                                                    </div>

                                                                </div>
                                                                <Tile
                                                                    className={`${tile.id} ${tile.able_to_use !== '0' ? 'enabled' : 'disabled'} ${deleting === tile.id ? 'shake' : ''}`}
                                                                    onClick={() => document.getElementsByClassName(`${tile.title.replace(/\s+/g, '-').toLowerCase()}`)[0].scrollIntoView({block: 'center'})}
                                                                    title={tile.title}
                                                                    illustration={tile.illustration_file_name}
                                                                    path={undefined}/>
                                                            </div>
                                                        )
                                                    })}
                                                    <div className="edit-tile" key={'weifjurghe93y874yr7g'}>
                                                        <div className="edit-items">
                                                            <div className="edit-item" onClick={() => {
                                                                setEditTile('');
                                                                setTileID(null);
                                                                setPageID(page.id);
                                                                setPopup(page.id)
                                                            }}>
                                                                <p>Nieuwe tegel</p>
                                                                <img src={'/images/tile.svg'} alt={''}/>
                                                            </div>
                                                            <div className="edit-item" onClick={() => {
                                                                setEditTile('');
                                                                setTileID(null);
                                                                setPageID(page.id);
                                                                setFindOrganisation(page.id);
                                                                setSelectedOrganisation(null);
                                                            }}>
                                                                <p>Organisatie tegel</p>
                                                                <img src={'/images/organisation.svg'} alt={''}/>
                                                            </div>
                                                        </div>
                                                        <div className="new-tile tile">
                                                            <div className="plus">
                                                                <div className="line"/>
                                                                <div className="line"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <p>Deze pagina kan nu niet worden gebruikt. Zet deze weer op 'gebruiken' om
                                                deze
                                                te kunnen bewerken.</p>}
                                        {popup === page.id ?
                                            <div className="popup">
                                                <h1>{editTile ? `Keuze tegel bewerken (${editTile.title})` : 'Nieuwe tegel aanmaken'}</h1>
                                                <form method={'post'} onSubmit={(e) => {
                                                    if (editTile === '') {
                                                        handleNewTile(e);
                                                    } else {
                                                        handleEditTile(e);
                                                    }
                                                }}>
                                                    <label>
                                                        <p>Tegel titel</p>
                                                        <input type={'text'} name={'title'}
                                                               defaultValue={editTile?.title}
                                                               placeholder={'Titel van de tegel'} onChange={(e) =>
                                                        {
                                                            handleInput([e.target.value, e.target.name]);
                                                        }} required/>
                                                    </label>
                                                    <label>
                                                        <p>Illustratie voor de tegel</p>
                                                        <input type={'file'} name={'illustration'}
                                                               accept="image/png, image/gif, image/jpeg, image/svg+xml"
                                                               onChange={(e) => handleInput([e.target.files[0], e.target.name])}
                                                               required={editTile === '' ? true : false}/>
                                                    </label>
                                                    <div className="btns">
                                                        <button className={'btn save'}
                                                                type={'submit'}>{editTile ? `Opslaan` : 'Aanmaken'}</button>
                                                        <div className="btn" onClick={() => {
                                                            setPopup('');
                                                            setTileID(null);
                                                        }}>Annuleren
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            : null}
                                        {editPage === page.id ?
                                            <div className="popup">
                                                <h1>Pagina aanpassen ({page.title})</h1>
                                                <p>Bij het aanpassen van de pagina, wordt ook de keuze tegel waar op je
                                                    moet
                                                    klikken om hier heen te gaan aangepast.</p>
                                                <form method={'post'} onSubmit={(e) => {
                                                    handleEditPage(e)
                                                }}>
                                                    <label>
                                                        <p>Pagina titel</p>
                                                        <input type={'text'} name={'title'} defaultValue={page.title}
                                                               placeholder={'Titel van de pagina'} onChange={(e) => {
                                                            handleInput([e.target.value, e.target.name])
                                                            setPageID(page.id);
                                                        }} required/>
                                                    </label>
                                                    <div className="btns">
                                                        <button className={'btn save'}
                                                                type={'submit'}>{loading ? 'Bezig ...' : 'Opslaan'}</button>
                                                        <div className="btn" onClick={() => setEditPage('')}>Annuleren
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            : null}
                                    </div>
                                )
                            }
                        })}
                    </>
                        : <p className={'not-found'}>Pagina niet gevonden.</p>
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
        </AdminPage>
    )
}
