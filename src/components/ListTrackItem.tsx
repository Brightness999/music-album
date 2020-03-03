import React from 'react';
import { Col } from 'reactstrap';
import Marquee from 'react-text-marquee';

import { Track } from '../models';
import DownloadButton from './DownloadButton';
import ListTrackPlayButton from './ListTrackPlayButton';

interface IProps {
    track: Track;
}

export default function(props: IProps) {
    return (
        <div className="list-track-item d-flex align-items-center justify-content-around mt-3 mb-3">
            <Col sm="6" className="d-flex align-items-center">
                <div className="position-relative d-flex">
                    <img src={ `/uploads/albums/${props.track.album.location}/thumb/${props.track.album.slug}.jpg` } alt="album" />
                </div>
                <ListTrackPlayButton track={ props.track }/>
                <Marquee text={ props.track.artist.name + '-' + props.track.title } className="ml-2 mr-2" />
            </Col>
            <Col sm="1">
                <Marquee text={ props.track.album.publisher.name } />
            </Col>
            <Col sm="2">
                <Marquee text={ props.track.category.name } />
            </Col>
            <Col sm="3" className="pr-1 d-flex">
                <DownloadButton className="mr-1" track={ props.track } type="mp3"/>
                <DownloadButton track={ props.track } type="flac"/>
            </Col>
        </div>
    );
}
