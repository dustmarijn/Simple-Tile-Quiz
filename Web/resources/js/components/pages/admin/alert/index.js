import React from 'react';

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
