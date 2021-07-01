import React from 'react';
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

/**
 * Deze functie zorgt er voor dat er een laad scherm komt voor dat de
 * tiles worden ingeladen. Hij laad hierdoor 3 grijze blokken en een
 * grijs blok zien voor de titel.
 */
export default function SkeletonLoading() {
    return (
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
    )
}
