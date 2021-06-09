import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// Import pages
import Home from "./components/pages/home";
import axios from "axios";

export default function App() {
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState([]);
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
    }, [loading]);

    // Test Pages (Would normally import from database.)

    return (
        <>
            <Router>
                <Switch>
                    {/*This will render all routes given from the database */}
                    {pages.map((page, index) => {
                        return (
                            <Route key={index} exact path={page.path}><Home title={page.title} tiles={page.tiles}/></Route>
                        )
                    })}
                    {/*This will render a 404 not found page*/}
                    <Route key={'wo-3i4u508tjifnew34567832'} path={'/'}><Home title={loading ? '' : 'Pagina niet gevonden'} tiles={[]}/></Route>

                    {loading ?
                        <Route key={'wo-3i4u508tjifnew34567832'} path={'/'}><Home title={loading ? 'Aan het laden ...' : ''} tiles={[]}/></Route>
                    : null }
                </Switch>
            </Router>
        </>
    )
}


ReactDOM.render(<App />, document.getElementById('app'));
