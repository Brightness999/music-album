import React from 'react';
import {Col} from 'reactstrap';

import Marquee from 'react-text-marquee';
import {Artist, Track} from "../models";
import {formatDuration} from "../utils";
import DownloadButton from "./DownloadButton";
import ListTrackPlayButton from "./ListTrackPlayButton";

interface IProps {
    track: Track;
    album_slug: string;
    album_location: string;
    artist: Artist;
}

export default function(props: IProps) {
    return (
        <div className="list-track-item d-flex align-items-center justify-content-around mt-3 mb-3">
            <Col sm="5" className="d-flex align-items-center">
                <img src={`/uploads/albums/${props.album_location}/thumb/${props.album_slug}.jpg`} alt="album"/>
                <ListTrackPlayButton track={props.track}/>
                <Marquee text={props.artist.name + '-' + props.track.title} className="ml-2 mr-2"/>
            </Col>
            <Col sm="2">
                <Marquee text={props.track.category.name}/>
            </Col>
            <Col sm="1">
                120
            </Col>
            <Col sm="1">
                { formatDuration(props.track.duration) }
            </Col>
            <Col sm="3" className="d-flex pr-1">
                <DownloadButton className="mr-1" track={props.track} type="mp3"/>
                <DownloadButton track={props.track} type="flac"/>
            </Col>
        </div>
    );
}