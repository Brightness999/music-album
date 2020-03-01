import React from 'react';
import {Button, Col} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDownload, faPlay} from '@fortawesome/free-solid-svg-icons';
import Marquee from 'react-text-marquee';
import {Track} from "../models";
import {formatFilesize} from "../utils";

interface IProps {
    track: Track;
}

export default function(props: IProps) {
    return (
        <div className="list-track-item d-flex align-items-center justify-content-around mt-3 mb-3">
            <Col sm="6" className="d-flex align-items-center">
                <img src={`/uploads/albums/${props.track.album.location}/thumb/${props.track.album.slug}.jpg`} alt="album" />
                <FontAwesomeIcon icon={faPlay} className="ml-4"/>
                <Marquee text={props.track.artist.name + '-' + props.track.title} className="ml-2 mr-2" />
            </Col>
            <Col sm="1">
                <Marquee text={props.track.album.publisher.name} />
            </Col>
            <Col sm="1">
                <Marquee text={props.track.category.name} />
            </Col>
            <Col sm="4" className="d-flex justify-content-around">
                <Button className="download-button mr-2">
                    .mp3 ({formatFilesize(props.track.filesize)})&nbsp;&nbsp;<FontAwesomeIcon icon={faDownload}/>
                </Button>
                <Button className="download-button">
                    .flac ({formatFilesize(props.track.filesize)})&nbsp;&nbsp;<FontAwesomeIcon icon={faDownload}/>
                </Button>
            </Col>
        </div>
    );
}