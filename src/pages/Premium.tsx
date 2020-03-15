import React, {useEffect, useState} from 'react';
import PremiumCard from '../components/PremiumCard';
import { Col, Row } from 'reactstrap';
import { useDispatch } from 'react-redux';
import {setPremium, setWideScreen} from '../redux/actions';
import PremiumPopup from "../components/PremiumPopup";
import {Premium} from "../types";

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
            <Col><PremiumCard onClickRegistration={() => onClickRegistration(Premium.PREMIUM_30)} dayLimit={30} downloadPerDay={30} price={20}/></Col>
            <Col><PremiumCard onClickRegistration={() => onClickRegistration(Premium.PREMIUM_50)} dayLimit={30} downloadPerDay={50} price={30}/></Col>
            <Col><PremiumCard onClickRegistration={() => onClickRegistration(Premium.PREMIUM_100)} dayLimit={30} downloadPerDay={100} price={45}/></Col>
        </Row>
        <PremiumPopup isOpen={modal} toggle={toggle} className="easy-form"/>
    </div>;
}
