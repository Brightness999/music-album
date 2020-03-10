import React from 'react';
import { Track } from '../models';
import ListTrackItem from './ListTrackItem';
import GenreTitleHeader from './GenreTitleHeader';
import { Col, Row } from 'reactstrap';
import { formatSimpleDate } from '../utils';

interface Props {
    tracks: Track[];
}

export default function TracksListView(props: Props) {
    let elmTracks: JSX.Element[] = [];
    let index = 0;
    let lastGenreId = -1;
    let strLastDate = '';

    props.tracks.forEach(track => {
        const strTrackDate = formatSimpleDate(track.created_at);
        if (strLastDate !== strTrackDate) {
            strLastDate = strTrackDate;
            elmTracks.push(<div key={index++}>{strTrackDate}</div>);
        }
        if (lastGenreId !== track.category.id) {
            lastGenreId = track.category.id;
            elmTracks.push(<GenreTitleHeader category={track.category} key={index++}/>);
        }
        elmTracks.push(<ListTrackItem track={track} key={index++}/>);
    });
    return (
        <div className="album-content">
            <Row className="album-header d-flex">
                <Col sm={5}>Artist & Title</Col>
                <Col sm={2}>Label</Col>
                <Col sm={2}>Genre</Col>
                <Col sm={3}/>
            </Row>
            {elmTracks.length !== 0?elmTracks:<div className="text-center pt-3">Nothing to display.</div>}
        </div>
    );
}
