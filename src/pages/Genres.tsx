import React, { createRef, useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import ScrollArea from 'react-scrollbar';

import { scrollbarStyles, trackCountPerPage } from '../consts';
import { Track } from '../models';
import GenreTitleHeader from '../components/GenreTitleHeader';
import ListTrackItem from '../components/ListTrackItem';
import AlbumPagination from '../components/AlbumPagination';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentPage, selectTracks } from '../redux/selectors';
import { requestGenreTracks, requestTracks, setCurrentPage } from '../redux/actions';

export default function GenresPage() {
    let { slug } = useParams();
    console.log(`slug=${slug}`);
    const tracks = useSelector(selectTracks);
    const dispatch = useDispatch();
    const currentPage = useSelector(selectCurrentPage);
    const refScrollArea = createRef<ScrollArea>();

    useEffect(() => {
        dispatch(setCurrentPage(0));
    }, [dispatch, slug]);

    useEffect(() => {
        if (slug === undefined) {
            dispatch(requestTracks(currentPage * trackCountPerPage, trackCountPerPage));
        } else {
            dispatch(requestGenreTracks(slug, currentPage * trackCountPerPage, trackCountPerPage));
        }
    }, [slug, dispatch, currentPage]);

    useEffect(() => {
        refScrollArea.current?.scrollTop();
    }, [tracks, refScrollArea]);

    let lastGenreId: number = -1;
    let elmTracks: JSX.Element[] = [];
    let index = 0;
    tracks.forEach((track: Track) => {
        if (lastGenreId === -1 || lastGenreId !== track.category.id) {
            lastGenreId = track.category.id;
            elmTracks.push(<GenreTitleHeader key={index++} title={track.category.name}/>);
        }
        elmTracks.push(<ListTrackItem track={track} key={index++} />);
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
                    ref={refScrollArea}
                    className="scroll-area"
                    verticalScrollbarStyle={scrollbarStyles}
                    verticalContainerStyle={scrollbarStyles}
                    horizontal={false}
                    smoothScrolling= {true}
                    minScrollSize={40}>
                    { elmTracks }
                </ScrollArea>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <AlbumPagination/>
            </div>
        </div>
    );
}
