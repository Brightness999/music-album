import React, { useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import ScrollArea from 'react-scrollbar';

import { scrollbarStyles } from '../consts';
import { Track } from '../models';
import GenreTitleHeader from '../components/GenreTitleHeader';
import ListTrackItem from '../components/ListTrackItem';
import AlbumPagination from '../components/AlbumPagination';
import { useDispatch, useSelector } from 'react-redux';
import { selectTracks } from '../redux/selectors';
import { requestTracks } from '../redux/actions';

export default function GenresPage() {
    let { slug } = useParams();
    const tracks = useSelector(selectTracks);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(requestTracks());
    }, [slug]);
    let lastGenreId: number = -1;
    let elmTracks = tracks.map((track: Track, index: number) => {
        if (lastGenreId === -1 || lastGenreId !== track.category.id) {
            lastGenreId = track.category.id;
            return <GenreTitleHeader key={index++} title={track.category.name}/>;
        }
        return <ListTrackItem track={track} />;
    });

    return (
        <div className="page">
            <div className="album-content">
                <Row className="album-header d-flex">
                    <Col sm={6}>Artist & Title</Col>
                    <Col sm={1}>Label</Col>
                    <Col sm={1}>Genre</Col>
                    <Col sm={4}/>
                </Row>
                <ScrollArea
                    className="scroll-area"
                    verticalScrollbarStyle={scrollbarStyles}
                    verticalContainerStyle={scrollbarStyles}
                    horizontal={false}
                    smoothScrolling= {true}
                    minScrollSize={40}>
                    {elmTracks}
                </ScrollArea>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <AlbumPagination/>
            </div>
        </div>
    );
}
