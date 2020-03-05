import React from 'react';
import { Category, Track } from '../models';
import ListTrackItem from './ListTrackItem';
import GenreTitleHeader from './GenreTitleHeader';
import { Col, Row } from 'reactstrap';

interface Props {
    tracks: Track[];
}

export default function TracksListView(props: Props) {
    let elmTracks: JSX.Element[] = [];
    let index = 0;
    let elmTracksMap: Map<number, JSX.Element[]> = new Map();
    let categoryMap: Map<number, Category> = new Map();
    props.tracks.forEach(track => {
        if (!categoryMap.has(track.category.id)) {
            categoryMap.set(track.category.id, track.category);
        }
        if (!elmTracksMap.has(track.category.id)) {
            elmTracksMap.set(track.category.id, []);
        }
        elmTracksMap.get(track.category.id)?.push(<ListTrackItem track={track} key={index++}/>);
    });
    elmTracksMap.forEach((_emlTracks, key ) => {
        elmTracks.push(<GenreTitleHeader category={categoryMap.get(key)}/>);
        elmTracks = elmTracks.concat(_emlTracks);
    });
    return (
        <div className="album-content">
            <Row className="album-header d-flex">
                <Col sm={5}>Artist & Title</Col>
                <Col sm={2}>Label</Col>
                <Col sm={2}>Genre</Col>
                <Col sm={3}/>
            </Row>
            {elmTracks}
        </div>
    );
}
