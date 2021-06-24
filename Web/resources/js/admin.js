import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Switch, useLocation} from 'react-router-dom';

// Import pages
import axios from "axios";
import Admin from "./components/pages/admin";
import Topnavigation from "./components/pages/admin/components/topnavigation";
import Sidebar from "./components/pages/admin/components/sidebar";

import './components/pages/admin/index.scss';
import Page from "./components/default components/page";
import Screens from "./components/pages/admin/edit/screens";
import UserProvider from "./components/providers/UserProvider";
import TitleBar from "./components/pages/admin/components/titlebar";
import NotificationProvider from "./components/providers/NotificationProvider";
import Organisations from "./components/pages/admin/edit/organisations";

export default function App() {
    const [loading, setLoading] = useState(true);

    return (
        <>
            <Router>
                <NotificationProvider>
                    <UserProvider>
                        <Topnavigation/>
                        <TitleBar/>
                        <Sidebar/>
                        <Switch>
                            {/* Admin route */}
                            <Route key={'w3456y9hugjfoire56905843eokrfgijy8'} exact path={'/admin'} component={Admin}/>
                            <Route key={'erty765y5ii5iu5ju5'} exact path={'/admin/organisations'} component={Organisations}/>
                            <Route key={'feigur8hth7t7yuhtuhjjg5rti'} exact path={'/admin/edit/screens'} component={Screens}/>

                            {/*This will render a 404 not found adminpage*/}
                            <Route key={'wo-3i4u508tjifnew34567832'} path={'/'}><Page><h1>404 niet gevonden</h1></Page></Route>
                        </Switch>
                    </UserProvider>
                </NotificationProvider>
            </Router>
        </>
    )
}


ReactDOM.render(<App />, document.getElementById('admin'));
