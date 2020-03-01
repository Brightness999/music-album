import React from 'react';
import {Button, Col} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay} from '@fortawesome/free-solid-svg-icons';
import Marquee from 'react-text-marquee';
import {Track} from "../models";
import DownloadButton from "./DownloadButton";
import {useDispatch} from "react-redux";
import {setCurrentTrack} from "../store";

interface IProps {
    track: Track;
}

export default function(props: IProps) {
    const dispatch = useDispatch();
    return (
        <div className="list-track-item d-flex align-items-center justify-content-around mt-3 mb-3">
            <Col sm="6" className="d-flex align-items-center">
                <img src={`/uploads/albums/${props.track.album.location}/thumb/${props.track.album.slug}.jpg`} alt="album" />
                <Button className="hl-control normal-control" onClick={() => dispatch && dispatch(setCurrentTrack(props.track.slug))}>
                    <FontAwesomeIcon icon={faPlay}/>
                </Button>
                <Marquee text={props.track.artist.name + '-' + props.track.title} className="ml-2 mr-2" />
            </Col>
            <Col sm="1">
                <Marquee text={props.track.album.publisher.name} />
            </Col>
            <Col sm="1">
                <Marquee text={props.track.category.name} />
            </Col>
            <Col sm="2" className="pr-1">
                <DownloadButton track={props.track} type="mp3"/>
            </Col>
            <Col sm="2" className="pl-1">
                <DownloadButton track={props.track} type="flac"/>
            </Col>
        </div>
    );
}