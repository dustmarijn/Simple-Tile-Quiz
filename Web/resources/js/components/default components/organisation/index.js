import React from 'react';

/**
 * Deze functie geeft een organisatie component terug met de informatie die toe
 * behoort aan de organisastie, zoals naam, contact gegevens en een logo.
 */
export default function Organisation({org}) {
    return (
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
    )
}
