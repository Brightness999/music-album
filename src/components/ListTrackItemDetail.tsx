import React from 'react';
import { Col, Row } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Marquee from 'react-text-marquee';

import { Artist, Track } from '../models';
import { formatDuration } from '../utils';
import TrackDownloadButton from './TrackDownloadButton';
import ListTrackPlayButton from './ListTrackPlayButton';
import { composeAlbumImagePath, composeTrackName } from '../common';
import { MusicFileType } from '../types';

interface Props {
    track: Track;
    album_slug: string;
    album_location: string;
    artist: Artist;
}

export default function(props: Props) {
    return (
        <Row className="list-track-item d-flex align-items-center justify-content-around mt-3 mb-3">
            <Col sm="5" className="d-flex align-items-center">
                <img src={ composeAlbumImagePath(props.album_location, props.album_slug) } alt="album"/>
                <ListTrackPlayButton track={props.track}/>
                <Marquee text={ composeTrackName(props.track) } className="ml-2 mr-2"/>
            </Col>
            <Col sm="2">
                <NavLink to={`/genres/${props.track.category.slug}/s/LIST/p/0`} className="genre-link">{ props.track.category.name }</NavLink>
            </Col>
            <Col sm="2">
                { formatDuration(props.track.duration) }
            </Col>
            <Col sm="3" className="d-flex pr-1">
                <TrackDownloadButton className="mr-1" track={ props.track } type={ MusicFileType.MP3 }/>
                <TrackDownloadButton track={ props.track } type={ MusicFileType.FLAC }/>
            </Col>
        </Row>
    );
}
