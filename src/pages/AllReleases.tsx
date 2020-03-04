import React, { useEffect } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faThList } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

import { albumCountPerPage, trackCountPerPage } from '../consts';
import { Album, Category } from '../models';
import { ShowMode } from '../redux/store';
import { selectAllAlbumList, selectCurrentPage, selectShowMode, selectTracks } from '../redux/selectors';
import { requestAllAlbums, requestTracks, setCurrentPage, setShowMode } from '../redux/actions';

import ListTrackItem from '../components/ListTrackItem';
import GenreTitleHeader from '../components/GenreTitleHeader';
import AlbumPagination from '../components/AlbumPagination';
import LargeAlbumItem from '../components/LargeAlbumItem';
import { useParams } from 'react-router-dom';

export default function AllReleases() {
    const showMode = useSelector(selectShowMode);
    const albums = useSelector(selectAllAlbumList);
    const tracks = useSelector(selectTracks);
    let { publisherSlug } = useParams();
    const dispatch = useDispatch();
    const currentPage = useSelector(selectCurrentPage);

    useEffect(() => {
        dispatch(setCurrentPage(0));
    }, [dispatch]);

    useEffect(() => {
        if (publisherSlug !== undefined) {
            dispatch(setShowMode(ShowMode.GRID));
        }
    }, [publisherSlug, dispatch]);

    useEffect(() => {
        if (showMode === ShowMode.GRID) {
            dispatch(requestAllAlbums(currentPage * albumCountPerPage, albumCountPerPage, publisherSlug || ''));
        } else {
            dispatch(requestTracks(currentPage * trackCountPerPage, trackCountPerPage));
        }
    }, [showMode, publisherSlug, dispatch, currentPage]);

    useEffect(() => {
        window.scrollTo({top: 0});
    }, [tracks, albums]);

    let albumContent;
    if (showMode === ShowMode.GRID) {
        albumContent = (
            <div className="album-content">
                <div className="d-flex flex-wrap">
                    {
                        albums.map((album: Album, index: number) =>
                            <div className="col-20" key={index}>
                                <LargeAlbumItem album={album} />
                            </div>)
                    }
                </div>
            </div>
        );
    } else {
        let elmTracks: JSX.Element[] = [];
        let index = 0;
        let elmTracksMap: Map<number, JSX.Element[]> = new Map();
        let categoryMap: Map<number, Category> = new Map();
        tracks.forEach(track => {
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
        albumContent = (
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

    return (
        <div className="page">
            <div className="d-flex justify-content-between">
                <p className="page-title">{publisherSlug?albums[0]?.publisher.name:'All releases'}</p>
                <div className="d-flex align-items-center">
                    <Button className="hl-control normal-control" active={showMode === ShowMode.GRID} onClick={() => dispatch && dispatch(setShowMode(ShowMode.GRID))}>
                        <FontAwesomeIcon icon={faThLarge} />&nbsp;&nbsp;Grid
                    </Button>
                    <Button className="hl-control normal-control" active={showMode === ShowMode.LIST} onClick={() => dispatch && dispatch(setShowMode(ShowMode.LIST))}>
                        <FontAwesomeIcon icon={faThList} />&nbsp;&nbsp;List
                    </Button>
                </div>
            </div>
            { albumContent }
            <div className="d-flex justify-content-center align-items-center">
                <AlbumPagination/>
            </div>
        </div>
    );
}
