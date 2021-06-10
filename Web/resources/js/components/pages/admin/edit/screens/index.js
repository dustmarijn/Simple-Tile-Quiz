import React, {useEffect, useState} from 'react';
import AdminPage from "../../components/adminpage";
import axios from "axios";


import './index.scss';
import Tile from "../../../../default components/tile";

export default function Screens() {
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState([]);
    const [popup, setPopup] = useState(false);

    useEffect(() => {
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
    }, []);

    function handleNewTile() {

    }

    function handleInput(e) {

    }

    return (
        <AdminPage>
            <div className="pages">
                {loading === false ?
                    <>
                        {pages?.map((page, index) => {
                            return (
                                <div className="page" key={index}>
                                    <h1>{page.title}</h1>
                                    <p>Pad naar het scherm: <span>{page.path}</span></p>
                                    <p>Keuze tegels die bij dit scherm horen:</p>
                                    <div className="tiles">
                                        {page.tiles.map((tile, index) => {
                                            return (
                                                <Tile title={tile.title} illustration={tile.illustration_file_name} path={'/admin/edit/screens/' + tile.id}/>
                                            )
                                        })}
                                        <div className="new-tile" onClick={() => setPopup(!popup)}>
                                            <div className="plus">
                                                <div className="line"/>
                                                <div className="line"/>
                                            </div>
                                            <h1>Nieuwe tegel</h1>
                                        </div>
                                    </div>
                                    {!popup ?
                                        <div className="popup">
                                            <h1>Nieuwe tegel aanmaken</h1>
                                            <form method={'post'}>
                                                <label>
                                                    <p>Tegel titel</p>
                                                    <input type={'text'} name={'title'} placeholder={'Titel van de tegel'} onChange={(e) => handleInput([e.target.value, e.target.name])} required/>
                                                </label>
                                                <label>
                                                    <p>Pad naar tegel</p>
                                                    <input type={'text'} name={'path'} placeholder={`Voorbeeld '/tegel' `} onChange={(e) => handleInput([e.target.value, e.target.name])} required/>
                                                </label>
                                                <label>
                                                    <p>Illustratie voor de tegel</p>
                                                    <input type={'file'} name={'illustration'} accept="image/png, image/gif, image/jpeg" onChange={(e) => handleInput([e.target.value, e.target.name])} required/>
                                                </label>
                                                <div className="btns">
                                                    <button className={'btn save'} type={'submit'}>Aanmaken</button>
                                                    <div className="btn" onClick={() => setPopup(!popup)}>Annuleren</div>
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
