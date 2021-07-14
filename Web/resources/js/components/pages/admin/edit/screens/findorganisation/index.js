import React, {useEffect, useState} from 'react';

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

    const [searchedOrg, setSearchedOrg] = useState(null);

    useEffect(() => {
        setSearchedOrg(organisations);
    }, [organisations])

    function handleSearch(text) {
        const searchOrg = organisations?.filter(org => org.name.toLowerCase().includes(text.toLowerCase()));
        console.log(searchOrg);
        if(searchOrg) {
            setSearchedOrg(searchOrg);
        }
    }

    return (
        findOrganisation === page.id ?
            <div className="find-organisations">
                <h1>Organisaties</h1>
                <p>Kies een organisatie en deze wordt weer gegeven als een tegel.</p>
                <div className="topitems">
                    <div className="search margin-left-null">
                        <img src={'/images/search.svg'} alt={''}/>
                        <input type={'search'} placeholder={'Zoeken naar organisaties ...'} onChange={(e) => handleSearch(e.target.value)} />
                    </div>
                </div>
                <div className="organisations">
                    {searchedOrg?.length > 0 ?
                        searchedOrg?.map((org, index) => {
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
                        })
                    : <p>Geen organisatie gevonden.</p>}
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
