import React from 'react';

import './index.scss';

export default function AdminPage({children}) {
    return (
        <div className="adminpage">
            {children}
        </div>
    )
}
