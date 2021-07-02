import React from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// Styles die worden ingeladen.
import './components/pages/admin/index.scss';

// Handige componenten die kunnen worden gebruikt
import Admin from "./components/pages/admin";
import Page from "./components/default components/page";
import Topnavigation from "./components/pages/admin/components/topnavigation";
import Sidebar from "./components/pages/admin/components/sidebar";
import TitleBar from "./components/pages/admin/components/titlebar";
import Screens from "./components/pages/admin/edit/screens";
import Organisations from "./components/pages/admin/edit/organisations";

// Api Provider's die kunnen worden gebruikt.
import UserProvider from "./components/providers/UserProvider";
import NotificationProvider from "./components/providers/NotificationProvider";

export default function App() {
    return (
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
    )
}


ReactDOM.render(<App />, document.getElementById('admin'));
