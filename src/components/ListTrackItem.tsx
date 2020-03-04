import React from 'react';
import { Col, Row } from 'reactstrap';
import Marquee from 'react-text-marquee';

import { Track } from '../models';
import DownloadButton from './DownloadButton';
import ListTrackPlayButton from './ListTrackPlayButton';
import { MusicFileType } from '../types';
import { composeAlbumImagePath, composeTrackName } from '../common';
import { NavLink } from 'react-router-dom';

interface IProps {
    track: Track;
}

export default function(props: IProps) {
    return (
        <Row className="list-track-item d-flex align-items-center justify-content-around mt-3 mb-3">
            <Col sm="5" className="d-flex align-items-center">
                <div className="position-relative d-flex">
                    <img src={ composeAlbumImagePath(props.track.album.location, props.track.album.slug) } alt="album" />
                </div>
                <ListTrackPlayButton track={ props.track }/>
                <Marquee text={ composeTrackName(props.track) } className="ml-2 mr-2" />
            </Col>
            <Col sm="2">
                <NavLink to={`/all-releases/${props.track.album.publisher.slug}`} className="genre-link">
                    { props.track.album.publisher.name }
                </NavLink>
            </Col>
            <Col sm="2">
                <NavLink to={`/genres/${props.track.category.slug}`} className="genre-link">{ props.track.category.name }</NavLink>
            </Col>
            <Col sm="3" className="pr-1 d-flex">
                <DownloadButton className="mr-1" track={ props.track } type={ MusicFileType.MP3 }/>
                <DownloadButton track={ props.track } type={ MusicFileType.FLAC }/>
            </Col>
        </Row>
    );
}
