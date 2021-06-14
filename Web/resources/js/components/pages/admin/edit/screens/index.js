import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import AdminPage from "../../components/adminpage";
import axios from "axios";


import './index.scss';
import Tile from "../../../../default components/tile";

export default function Screens() {
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState([]);
    const [popup, setPopup] = useState('');
    const [editPage, setEditPage] = useState('');
    const [alert, setAlert] = useState(false);
    const [alertMSG, setAlertMSG] = useState({
        title: 'Bericht',
        description: 'Beschrijving van bericht',
        actionOK: null,
        actionOKMessage: 'Oké',
        actionCancel: null,
        actionCancelMessage: 'Annuleren',
    });

    const [title, setTitle] = useState(null);
    const [path, setPath] = useState(null);
    const [image, setImage] = useState(null);
    const [pageID, setPageID] = useState(null);

    useEffect(() => {
        getPages();
    }, []);

    function getPages() {
        axios.get('/api/pages')
            .then(response => {
                if(response.data.pages) {
                    setPages(response.data.pages);
                    setLoading(false);
                }

                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    function handleNewTile(e) {
        e.preventDefault();
        if(title !== null && path !== null && image !== null) {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('path', path);
            formData.append('illustration_file_name', image);
            formData.append('page_id', pageID);

            setLoading(true);

            axios.post('/api/createTile', formData)
                .then(response => {
                    setPopup('');
                    getPages();
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                });

            axios.post('/api/createPage', {
                title: title,
                path: path,
            })
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
        if(e[1] === 'title') {
            setTitle(e[0]);
        }
        if(e[1] === 'path') {
            setPath(e[0]);
        }
        if(e[1] === 'illustration') {
            setImage(e[0]);
        }
    }

    function handleDeleteTile(tile) {
        setLoading(true);
        axios.post('/api/deleteTile', {
            id: tile.id,
            page_id: tile.page_id,
        })
            .then(response => {
                console.log(response);
                getPages();
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
            })
    }

    function handleEditTile(tile) {

    }

    function handleEditPage(e) {
        e.preventDefault();
        setLoading(true);
        axios.post('/api/editPage', {
            title: title,
            path: path,
            page_id: pageID,
        })
            .then(response => {
                setEditPage('');
                getPages();
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
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
                            <button className={'btn save'} onClick={alertMSG.actionOK}>{alertMSG.actionOKMessage}</button>
                            <button className={'btn'} onClick={alertMSG.actionCancel}>{alertMSG.actionCancelMessage}</button>
                        </div>
                    </div>
                </div>
            : null }
            <div className="pages">
                {loading === false ?
                    <>
                        {pages?.map((page, index) => {
                            return (
                                <div className={`page ${page.title.replace(/\s+/g, '-').toLowerCase()}`} key={index}>
                                    <h1>{page.title}</h1>
                                    <p>Pad naar het scherm: <span>{page.path}</span></p>
                                    <button className={'btn save mg-top'} onClick={() => setEditPage(page.id)}>Bewerken</button>
                                    <p className={'give-tiles'}>Keuze tegels die bij dit scherm horen:</p>
                                    <div className="tiles">
                                        {page.tiles.map((tile, num) => {
                                            return (
                                                <div className="edit-tile" key={num}>
                                                    <div className="edit-items">
                                                        <img title={'Bewerken'} className={'item-btn'} onClick={() => handleEditTile(tile)} src={'/images/pen-solid.svg'} alt={''}/>
                                                        <img title={'Verwijderen'} className={'item-btn'} onClick={() => {
                                                            setAlert(true);
                                                            setAlertMSG({
                                                                title: 'Keuze tegel verwijderen?',
                                                                description: 'Als u deze keuze tegel verwijderd, worden alle onderliggende pagina\'s ook verwijderd. Weet u het zeker?',
                                                                actionOK: () => {setAlert(false);handleDeleteTile(tile)},
                                                                actionOKMessage: 'Ja, verwijderen',
                                                                actionCancel: () => {setAlert(false);setAlertMSG({})},
                                                                actionCancelMessage: 'Nee, annuleren',
                                                            })
                                                        }} src={'/images/trash-alt-solid.svg'} alt={''}/>
                                                    </div>
                                                    <Tile onClick={() => document.getElementsByClassName(`${tile.title.replace(/\s+/g, '-').toLowerCase()}`)[0].scrollIntoView({block: 'center'})} title={tile.title} illustration={tile.illustration_file_name} path={undefined}/>
                                                </div>
                                            )
                                        })}
                                        <div className="new-tile" onClick={() => setPopup(page.id)}>
                                            <div className="plus">
                                                <div className="line"/>
                                                <div className="line"/>
                                            </div>
                                            <h1>Nieuwe tegel</h1>
                                        </div>
                                    </div>
                                    {popup === page.id ?
                                        <div className="popup">
                                            <h1>Nieuwe tegel aanmaken</h1>
                                            <form method={'post'} onSubmit={(e) => {
                                                handleNewTile(e)
                                            }}>
                                                <label>
                                                    <p>Tegel titel</p>
                                                    <input type={'text'} name={'title'} placeholder={'Titel van de tegel'} onChange={(e) => {
                                                        handleInput([e.target.value, e.target.name])
                                                        setPageID(page.id);
                                                    }} required/>
                                                </label>
                                                <label>
                                                    <p>Pad naar tegel</p>
                                                    <input type={'text'} name={'path'} placeholder={`Voorbeeld '/tegel' `} onChange={(e) => handleInput([e.target.value, e.target.name])} required/>
                                                </label>
                                                <label>
                                                    <p>Illustratie voor de tegel</p>
                                                    <input type={'file'} name={'illustration'} accept="image/png, image/gif, image/jpeg, image/svg+xml" onChange={(e) => handleInput([e.target.files[0], e.target.name])} required/>
                                                </label>
                                                <div className="btns">
                                                    <button className={'btn save'} type={'submit'}>{loading ? 'Bezig ...' : 'Aanmaken'}</button>
                                                    <div className="btn" onClick={() => setPopup('')}>Annuleren</div>
                                                </div>
                                            </form>
                                        </div>
                                        : null }
                                    {editPage === page.id ?
                                        <div className="popup">
                                            <h1>Pagina aanpassen ({page.title})</h1>
                                            <p>Bij het aanpassen van de pagina, wordt ook de keuze tegel waar op je moet klikken om hier heen te gaan aangepast.</p>
                                            <form method={'post'} onSubmit={(e) => {
                                                handleEditPage(e)
                                            }}>
                                                <label>
                                                    <p>Pagina titel</p>
                                                    <input type={'text'} name={'title'} defaultValue={page.title} placeholder={'Titel van de pagina'} onChange={(e) => {
                                                        handleInput([e.target.value, e.target.name])
                                                        setPageID(page.id);
                                                    }} required/>
                                                </label>
                                                <label>
                                                    <p>Pad naar pagina</p>
                                                    <input type={'text'} name={'path'} defaultValue={page.path} placeholder={`Voorbeeld '/pagina' `} onChange={(e) => handleInput([e.target.value, e.target.name])} required/>
                                                </label>
                                                <div className="btns">
                                                    <button className={'btn save'} type={'submit'}>{loading ? 'Bezig ...' : 'Opslaan'}</button>
                                                    <div className="btn" onClick={() => setEditPage('')}>Annuleren</div>
                                                </div>
                                            </form>
                                        </div>
                                        : null }
                                </div>
                            )
                        })}
                    </>
                : null }
            </div>
        </AdminPage>
    )
}
