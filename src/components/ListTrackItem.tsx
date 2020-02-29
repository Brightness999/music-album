import React from 'react';
import { Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faDownload } from '@fortawesome/free-solid-svg-icons';
import Marquee from 'react-text-marquee';
import AlbumAvatar from '../assets/images/1.png';

interface IProps {
    artist: string,
    title: string,
    label: string,
    genre: string,
}

export default function(props: IProps) {
    return (
        <div className="list-track-item d-flex align-items-center justify-content-around mt-3 mb-3">
            <Col sm="5" className="d-flex align-items-center">
                <img src={AlbumAvatar} />
                <FontAwesomeIcon icon={faPlay} className="ml-4"></FontAwesomeIcon>
                <Marquee text={props.artist + '-' + props.title} className="ml-2 mr-2" />
            </Col>
            <Col sm="2">
                {props.label}
            </Col>
            <Col sm="2">
                <Marquee text={props.genre} />
            </Col>
            <Col sm="3" className="d-flex justify-content-around">
                <Button className="download-button mr-2">
                    (110.95 Mb)&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
                </Button>
                <Button className="download-button">
                    (110.95 Mb)&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
                </Button>
            </Col>
        </div>
    );
}