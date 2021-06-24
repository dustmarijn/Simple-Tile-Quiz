import React, {useEffect, useState} from 'react';
import axios from "axios";
import NotificationApi from '../../api/NotificationApi';
import Authentication from "./authentication";
import AdminPage from "./components/adminpage";

export default function Admin() {
    const [loading, setLoading] = useState(true);

    const [organisations, setOrganisations] = useState([]);
    const {dispatch, setPageTitle} = NotificationApi();

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
                                <p> Aantal organisaties</p>
                            </div>
                            <div className="info-text normal">
                                <p>{organisations.length} organisaties</p>
                            </div>
                            <br/>
                            <br/>
                        </div>
                    </div>
                :
                    <div className="pages">
                        <div className="loading">
                            <div className="lds-ring">
                                <div/>
                                <div/>
                                <div/>
                                <div/>
                            </div>
                            <h1>Bijna klaar ...</h1>
                        </div>
                    </div>
                }
            </AdminPage>
        </>
    )
}
