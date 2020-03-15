import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faDownload, faSignal } from '@fortawesome/free-solid-svg-icons';

import VisaIcon from '../assets/images/visa.png';
import PayPalIcon from '../assets/images/paypal.png';
import MasterCardIcon from '../assets/images/mastercard.png';
import {Button} from "reactstrap";

interface Props {
    dayLimit: number;
    downloadPerDay: number;
    downloadSpeed?: number;
    price: number;
    onClickRegistration: () => void;
}

export default function PremiumCard(props: Props) {
    return (<div className="premium-card">
        <div className="premium-card-header text-center">PREMIUM { props.downloadPerDay }</div>
        <div className="premium-card-body d-flex flex-column justify-content-center">
            <div className="d-flex align-items-center pt-4 pb-2">
                <FontAwesomeIcon icon={ faCalendarAlt }/>
                <div className="pl-1">{ props.dayLimit } Days</div>
            </div>
            <div className="d-flex align-items-center pb-2">
                <FontAwesomeIcon icon={ faDownload }/>
                <div className="pl-1">{ props.downloadPerDay } GB download quota</div>
            </div>
            <div className="d-flex align-items-center pb-2">
                <FontAwesomeIcon icon={ faSignal }/>
                <div className="pl-1">Unlimited download speed</div>
            </div>
            <div className="d-flex align-items-center flex-grow-1 justify-content-center pt-5">
                <img className="mx-2" src={VisaIcon} height={25} alt="visa"/>
                <img className="mx-2" src={MasterCardIcon} height={25} alt="mastercard"/>
                <img className="mx-2" src={PayPalIcon} height={25} alt="paypal"/>
            </div>
            <div className="text-center py-2">{ props.price } &euro;</div>
            <Button color="primary" onClick={props.onClickRegistration}>Registration</Button>
        </div>
    </div>);
}