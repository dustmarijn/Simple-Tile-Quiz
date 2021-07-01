import React from 'react';

/**
 * Deze functie laat een menu zien met organisaties waaruit je kan kiezen om
 * een organisatie tegel van te maken.
 */
export default function FindOrganisation({
        findOrganisation,
        page,
        setPageID,
        setSelectedOrganisation,
        setPageType,
        organisations,
        selectedOrganisation,
        setFindOrganisation,
        handleOrgTile
    }) {
    return (
        findOrganisation === page.id ?
            <div className="find-organisations">
                <h1>Organisaties</h1>
                <p>Kies een organisatie en deze wordt weer gegeven als een tegel.</p>
                <div className="organisations">
                    {organisations?.map((org, index) => {
                        return (
                            <div
                                className={`tile ${selectedOrganisation === org.id ? 'selected' : ''}`}
                                key={index} onClick={() => {
                                setPageID(page.id);
                                setSelectedOrganisation(org.id);
                                setPageType('organisation');
                            }}>
                                <img src={'/images/organisationlogo/' + org.logo_file_name} alt={''}/>
                                <h1>{org.name}</h1>
                            </div>
                        )
                    })}
                </div>
                <div className="btns">
                    <button className={`btn ${selectedOrganisation ? 'use' : 'not-use'} save`} onClick={() => handleOrgTile()}>Tegel gebruiken</button>
                    <button className={'btn'} onClick={() => {
                        setFindOrganisation(null);
                        setSelectedOrganisation(null);
                        setPageID(null);
                        setPageType(null);
                    }}>Annuleren</button>
                </div>
            </div>
            : null
    )
}
