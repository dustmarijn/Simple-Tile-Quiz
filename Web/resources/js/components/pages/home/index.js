import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import Skeleton from "react-loading-skeleton";

// Style import
import './index.scss';

// Componenten die worden ingeladen.
import Page from "../../default components/page";
import Tile from "../../default components/tile";
import Organisation from "../../default components/organisation";
import SkeletonLoading from "../../default components/skeletonloading";

/**
 * Op de website op het home scherm wordt deze pagina ingeladen.
 * Hierop worden keuze tegels getoond op het moment dat het een
 * pagina is met keuze tegels en anders wordt er een organisatie
 * getoond met de informatie van de organisatie.
 */
export default function Home({title, tiles, organisation}) {
    const [loading, setLoading] = useState(true);
    const [org, setOrg] = useState(null);
    let url = document.URL;
    let lastPartUrl = url.substr(url.lastIndexOf('/') + 1);

    const history = useHistory();

    useEffect(() => {
        setLoading(false);
        organisation?.map((org) => {
            setOrg(org);
        });
        console.log(organisation);
    }, [organisation !== null]);

    useEffect(() => {
        setLoading(false);
    }, [tiles !== null]);

    return (
        <Page>
            <div className="content">
                {/* Dit zorgt er voor dat er een grijs blok komt voordat er een titel wordt geladen. */}
                <h1>{loading ? <Skeleton count={1} width={40 + 'vw'} /> : title}</h1>

                {/* Dit zorgt er voor dat er een terug knop komt als je niet meer op de home pagina bent.*/}
                {lastPartUrl !== '' ?
                    <button className={'back'} onClick={() => history.goBack()}>Terug</button>
                    : null}
                <div className="tiles">
                    {loading ?
                        <SkeletonLoading/>
                    :
                        org === null ?
                            tiles?.map((tile, index) => {
                                return (
                                    tile.able_to_use !== '0' ?
                                        <Tile key={index} title={tile.title} illustration={tile.illustration_file_name} path={tile.path}/>
                                    : null
                                )
                            })
                        :
                        <Organisation org={org}/>
                    }
                </div>
            </div>
        </Page>
    )
}
