import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useHistory} from "react-router-dom";
import Authentication from "./authentication";
import AdminPage from "./components/adminpage";

export default function Admin() {

    return (
        <>
            <AdminPage>
                <div className="content">
                    <h1>Admin</h1>
                </div>
            </AdminPage>
        </>
    )
}
