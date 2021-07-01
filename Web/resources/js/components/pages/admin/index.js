import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import axios from "axios";

// Handige componenten die kunnen worden gebruikt.
import LoadSpinner from "./components/loadspinner";
import AdminPage from "./components/adminpage";

// Api Provider's die kunnen worden gebruikt.
import NotificationApi from '../../api/NotificationApi';

/**
 * Deze functie laat het overzicht zien van de admin.
 * Hier in kan je zien hoeveel downloads van de mobiele
 * app en het aantal organisaties je kan zien.
 */
export default function Admin() {
    const [loading, setLoading] = useState(true);
    const [organisations, setOrganisations] = useState([]);

    const {setPageTitle} = NotificationApi();
    const history = useHistory();

    useEffect(() => {
        getOrganisations();
        var url = window.location.href;
        var part = url.substring(url.lastIndexOf('/') + 1);
        setPageTitle(part);
    }, []);

    function getOrganisations() {
        axios.get('/api/organisations')
            .then(response => {
                setOrganisations(response.data.organisations);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            })
    }

    return (
        <>
            <AdminPage>
                {loading === false ?
                    <div className="flexbox-container">
                        <div className="page">
                            <h1>Downloads</h1>
                            <div className="info-text">
                                <p>Platform:</p>
                                <p>Downloads:</p>
                            </div>
                            <div className="info-text normal">
                                <p>App Store IOS</p>
                                <p>0</p>
                            </div>
                            <div className="info-text normal">
                                <p>Play Store Android </p>
                                <p>0</p>
                            </div>
                        </div>
                        <div className="page">
                            <h1>Organisaties</h1>
                            <div className="info-text">
                                <p>Aantal organisaties</p>
                            </div>
                            <div className="info-text normal">
                                <p>{organisations.length} organisaties</p>
                            </div>
                            <button className={'btn save mg-top'} onClick={() => history.push('/admin/organisations')}>Bekijken</button>
                        </div>
                    </div>
                :
                    <LoadSpinner text={'Overzicht wordt opgehaald ...'}/>
                }
            </AdminPage>
        </>
    )
}
