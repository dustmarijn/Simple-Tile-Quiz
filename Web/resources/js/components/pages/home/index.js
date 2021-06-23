import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

// Import components for this adminpage
import Page from "../../default components/page";
import Tile from "../../default components/tile";

// Style import
import './index.scss';
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

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
                <h1>{loading ? <Skeleton count={1} width={40 + 'vw'} /> : title}</h1>

                {/* This will return you back to the previous adminpage */}
                {lastPartUrl !== '' ?
                    <button className={'back'} onClick={() => history.goBack()}>Terug</button>
                    : null}
                <div className="tiles">
                    {loading ?
                        <>
                            <div className="img">
                                <SkeletonTheme color="#e5e5e5" highlightColor="#fff">
                                    <Skeleton count={1} width={300 + 'px'} height={300 + 'px'} />
                                </SkeletonTheme>
                            </div>
                            <div className="img">
                                <SkeletonTheme color="#e5e5e5" highlightColor="#fff">
                                    <Skeleton count={1} width={300 + 'px'} height={300 + 'px'} />
                                </SkeletonTheme>
                            </div>
                            <div className="img">
                                <SkeletonTheme color="#e5e5e5" highlightColor="#fff">
                                    <Skeleton count={1} width={300 + 'px'} height={300 + 'px'} />
                                </SkeletonTheme>
                            </div>
                        </>
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
                        <div className="organisation-content">
                            <img src={'/images/organisationlogo/' + org?.logo_file_name} className={'logo'} alt={''}/>
                            <div className="info-org">
                                <h1>Contact gegevens</h1>
                                <div className="info">
                                    <img src={'/images/email.svg'} alt={''}/>
                                    <span onClick={() => window.open('mailTo:' + org?.email + '?body=')}>{org?.email}</span>
                                </div>
                                <div className="info">
                                    <img src={'/images/phone.svg'} alt={''}/>
                                    <span onClick={() => window.open('tel:+' + org?.phone_number)}>{org?.phone_number}</span>
                                </div>
                                <div className="info">
                                    <img src={'/images/location.svg'} alt={''}/>
                                    <span onClick={() => window.open('https://www.google.nl/maps/place/' + org?.location + '/')}>{org?.location}</span>
                                </div>
                                <div className="info">
                                    <img src={'/images/website.svg'} alt={''}/>
                                    <span onClick={() => window.open(org?.website)}>{org?.website}</span>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </Page>
    )
}
