import React from 'react';

import VisaIcon from '../assets/images/visa.png';
import PayPalIcon from '../assets/images/paypal.png';
import MasterCardIcon from '../assets/images/mastercard.png';
import Calendar from '../assets/images/calendar.png';
import Download from '../assets/images/download.png';
import Vinyl from '../assets/images/vinyl.png';
import Speed from '../assets/images/speed.png';

import {Button} from "reactstrap";
import {environment} from "../environments/envrionment";

interface Props {
    dayLimit: number;
    downloadPerDay: number;
    specialDownloadPerDay: number;
    downloadSpeed?: number;
    price: number;
    onClickRegistration: () => void;
    link?: string;
}

export default function PremiumCard(props: Props) {
    return (<div className="premium-card mb-2">
        <div className="premium-card-header text-center">
            <div className="premium-title-text">Premium { props.downloadPerDay }</div>
            <div className="price-text">{props.price}</div>
        </div>
        <div className="premium-card-body d-flex flex-column justify-content-center">
            <div className="d-flex align-items-center pt-4 pb-4">
                <img className="mx-2" src={Calendar} alt="calendar"/>
                <div className="pl-1">{ props.dayLimit } Days</div>
            </div>
            <div className="d-flex align-items-center pb-4">
                <img className="mx-2" src={Download} alt="download"/>
                <div className="pl-1">{ props.downloadPerDay } GB download quota</div>
            </div>
            <div className="d-flex pb-4">
                <img className="mx-2" src={Vinyl} alt="vinyl"/>
                <div className="pl-1">{ props.specialDownloadPerDay } GB download quota for Vinyl and Bandcamp section</div>
            </div>
            <div className="d-flex align-items-center pb-5">
                <img className="mx-2" src={Speed} alt="speed"/>
                <div className="pl-1">Unlimited download speed</div>
            </div>
            <div className="d-flex align-items-center flex-grow-1 justify-content-center pb-5">
                <img className="mx-2" src={MasterCardIcon} height={30} alt="mastercard"/>
                <img className="mx-2" src={VisaIcon} height={25} alt="visa"/>
                <img className="mx-2" src={PayPalIcon} height={25} alt="paypal"/>
            </div>
            {
                environment.TEST_MODE ?
                    <Button color="primary" onClick={props.onClickRegistration}>Registration</Button>:
                    <Button color="primary" onClick={() => {
                        window.open(props.link, '_blank');
                    }
                    }>Buy Now</Button>
            }
        </div>
    </div>);
}
