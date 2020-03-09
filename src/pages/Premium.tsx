import React, { useEffect } from 'react';
import PremiumCard from '../components/PremiumCard';
import { Col, Row } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { setWideScreen } from '../redux/actions';

export default function PremiumPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setWideScreen(true));
        return () => {
            dispatch(setWideScreen(false));
        }
    }, [dispatch]);
    return <div className="page">
        <Row className="cards-wrapper">
            <Col><PremiumCard dayLimit={30} downloadPerDay={30} price={10.95}/></Col>
            <Col><PremiumCard dayLimit={30} downloadPerDay={50} price={15.95}/></Col>
            <Col><PremiumCard dayLimit={30} downloadPerDay={100} price={21.95}/></Col>
        </Row>
    </div>;
}
