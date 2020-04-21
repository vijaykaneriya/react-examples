import React from 'react';
import * as Constants from './../utils/Constants';


export const Coockie =(props)=> {
    let {
        coockieMsg = Constants.COOCKIEMSG,
        agreeBtnText = Constants.AGREEBTNTEXT,
        moreInfoBtnText = Constants.MOREINFOBTNTEXT,
        agreeBtn,
        loadClass
    } = props
    return (
        <div className={"cookie-wrap " + loadClass}>
            <div className="container">
                <div className="cookie-msg">
                    {coockieMsg}
                </div>
                <div className="cookie-btns">
                    <button type="button" className="agree-button btn" onClick={agreeBtn}>{agreeBtnText}</button>
                    <a className="btn find-more-button find-more-button-processed"  href="https://www.boneo.se/cookies" target="_blank">{moreInfoBtnText}</a>
                </div>
            </div>
        </div>
    )
}