import React from 'react';

/**
 * Deze functie zorgt er voor dat er een alert komt in je scherm.
 * Dan kan je kiezen om te annuleren of om een volgende functie
 * uit te voeren die wordt meegegeven.
 */
export default function Alert({alertMSG}) {
    return (
        <div className="blackbox">
            <div className="alert">
                <h1>{alertMSG.title}</h1>
                <p>{alertMSG.description}</p>
                <div className="btns">
                    <button className={'btn save'}
                            onClick={alertMSG.actionOK}>{alertMSG.actionOKMessage}</button>
                    <button className={'btn'}
                            onClick={alertMSG.actionCancel}>{alertMSG.actionCancelMessage}</button>
                </div>
            </div>
        </div>
    )
}
