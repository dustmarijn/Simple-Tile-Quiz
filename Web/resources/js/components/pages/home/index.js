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
    let url = document.URL
    let lastPartUrl = url.substr(url.lastIndexOf('/') + 1);

    const history = useHistory();

    useEffect(() => {
        setLoading(false);
        console.log(organisation);
    }, [tiles && organisation]);

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
                        !organisation ?
                            tiles.map((tile, index) => {
                                return (
                                    tile.able_to_use !== '0' ?
                                        <Tile key={index} title={tile.title} illustration={tile.illustration_file_name} path={tile.path}/>
                                    : null
                                )
                            })
                        :
                            <div className="organisation-content">
                                <img src={'/images/organisation/logo' + organisation?.logo_file_name} alt={''}/>
                            </div>
                    }
                </div>
            </div>
        </Page>
    )
}
