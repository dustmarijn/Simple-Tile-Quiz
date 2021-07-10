import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from "axios";

// Handige componenten die kunnen worden gebruikt.
import Home from "./components/pages/home";


export default function App() {
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState(undefined);
    const [organisations, setOrganisations] = useState(undefined);

    useEffect(() => {
        axios.get('/api/pages')
            .then(response => {
                if(response.data.pages) {
                    setPages(response.data.pages);
                }
            })
            .catch(error => {
                console.log(error);
            });

        axios.get('/api/organisations')
            .then(response => {
                if(response.data.organisations) {
                    setOrganisations(response.data.organisations);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        setLoading(false);
    }, [organisations !== undefined && pages !== undefined]);

    return (
        <>
            <Router>
                <Switch>
                    {/*This will render all routes given from the database */}
                    {pages?.map((page, index) => {
                        if(page.path !== '/admin') {
                            if(page.type === 'tile') {
                                return (
                                    <Route key={index} exact path={page.path}><Home title={page.title} organisation={null} tiles={page.tiles}/></Route>
                                )
                            } else {
                                const org = organisations?.filter((org) => org.name === page.title);
                                if(org) {
                                    return (
                                        <Route key={index} exact path={page.path}><Home title={page.title} organisation={org} tiles={null}/></Route>
                                    )
                                }
                            }
                        }
                    })}

                    {/*This will render a 404 not found adminpage*/}
                    <Route key={'wo-3i4u508tjifnew34567832'} path={'/'}><Home title={loading === true ? 'Aan het laden ...' : ''} tiles={null} organisation={null}/></Route>
                </Switch>
            </Router>
        </>
    )
}


ReactDOM.render(<App/>, document.getElementById('application'));
