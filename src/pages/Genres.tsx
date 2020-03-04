import React, { useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';

import { trackCountPerPage } from '../consts';
import { Track } from '../models';
import GenreTitleHeader from '../components/GenreTitleHeader';
import ListTrackItem from '../components/ListTrackItem';
import AlbumPagination from '../components/AlbumPagination';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentPage, selectTracks } from '../redux/selectors';
import { requestGenreTracks, requestTracks, setCurrentPage } from '../redux/actions';

export default function GenresPage() {
    let { slug } = useParams();
    const tracks = useSelector(selectTracks);
    const dispatch = useDispatch();
    const currentPage = useSelector(selectCurrentPage);

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
        window.scrollTo({top: 0});
    }, [tracks]);

    let lastGenreId: number = -1;
    let elmTracks: JSX.Element[] = [];
    let index = 0;
    tracks.forEach((track: Track) => {
        if (lastGenreId === -1 || lastGenreId !== track.category.id) {
            lastGenreId = track.category.id;
            elmTracks.push(<GenreTitleHeader key={index++} category={track.category}/>);
        }
        elmTracks.push(<ListTrackItem track={track} key={index++} />);
    });

    return (
        <div className="page">
            <div className="album-content">
                <Row className="album-header d-flex">
                    <Col sm={5}>Artist & Title</Col>
                    <Col sm={2}>Label</Col>
                    <Col sm={2}>Genre</Col>
                    <Col sm={3}/>
                </Row>
                { elmTracks }
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <AlbumPagination/>
            </div>
        </div>
    );
}
