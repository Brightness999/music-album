import React, {useEffect, useState} from 'react';
import PremiumCard from '../components/PremiumCard';
import { Col, Row } from 'reactstrap';
import { useDispatch } from 'react-redux';
import {setPremium, setWideScreen} from '../redux/actions';
import PremiumPopup from "../components/PremiumPopup";
import {Premium} from "../types";
import {premiums} from "../consts";

export default function PremiumPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setWideScreen(true));
        return () => {
            dispatch(setWideScreen(false));
        }
    }, [dispatch]);

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const onClickRegistration = (premium: Premium) => {
        dispatch(setPremium(premium));
        toggle();
    };
    return <div className="page">
        <Row className="cards-wrapper">
            {
                premiums.map((premium, index) => (
                    <Col key={index}><PremiumCard
                        onClickRegistration={() => onClickRegistration(premium.premium)}
                        dayLimit={premium.dayLimit}
                        downloadPerDay={premium.downloadPerDay}
                        link={premium.link}
                        price={premium.price}/></Col>

                ))
            }
        </Row>
        <PremiumPopup isOpen={modal} toggle={toggle} className="easy-form"/>
    </div>;
}
