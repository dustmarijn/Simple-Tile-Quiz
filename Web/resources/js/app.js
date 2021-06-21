import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// Import pages
import Home from "./components/pages/home";
import axios from "axios";
import Admin from "./components/pages/admin";

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
    }, []);

    return (
        <>
            <Router>
                <Switch>
                    {/*This will render all routes given from the database */}
                    {pages.map((page, index) => {
                        if(page.path !== '/admin') {
                            return (
                                <Route key={index} exact path={page.path}><Home title={page.title} tiles={page.tiles}/></Route>
                            )
                        }
                    })}

                    {/*This will render a 404 not found adminpage*/}
                    <Route key={'wo-3i4u508tjifnew34567832'} path={'/'}><Home title={loading ? '' : 'Pagina niet gevonden'} tiles={[]}/></Route>
                </Switch>
            </Router>
        </>
    )
}


ReactDOM.render(<App />, document.getElementById('application'));
