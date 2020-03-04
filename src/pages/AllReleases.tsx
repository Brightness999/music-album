import React, { useEffect } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faThList } from '@fortawesome/free-solid-svg-icons';
import ScrollArea from 'react-scrollbar';
import { useDispatch, useSelector } from 'react-redux';

import { scrollbarStyles } from '../consts';
import { Album } from '../models';
import { ShowMode } from '../redux/store';
import { selectAllAlbumList, selectShowMode, selectTracks } from '../redux/selectors';
import {
    requestAllAlbums,
    requestTracks,
    setCurrentPage,
    setPageCount,
    setShowMode
} from '../redux/actions';

import ListTrackItem from '../components/ListTrackItem';
import GenreTitleHeader from '../components/GenreTitleHeader';
import AlbumPagination from '../components/AlbumPagination';
import LargeAlbumItem from '../components/LargeAlbumItem';

export default function AllReleases() {
    const showMode = useSelector(selectShowMode);
    const albums = useSelector(selectAllAlbumList);
    const tracks = useSelector(selectTracks);
    const dispatch = useDispatch();
    dispatch(setPageCount(10));
    dispatch(setCurrentPage(4));

    useEffect(() => {
        if (showMode === ShowMode.GRID) {
            dispatch(requestAllAlbums());
        } else {
            dispatch(requestTracks())
        }
    }, [showMode, dispatch]);
    let albumContent;
    if (showMode === ShowMode.GRID) {
        albumContent = (
            <div className="album-content">
                <ScrollArea
                    className="scroll-area"
                    verticalScrollbarStyle={scrollbarStyles}
                    verticalContainerStyle={scrollbarStyles}
                    horizontal={false}
                    smoothScrolling= {true}
                    minScrollSize={40}>
                    <div className="d-flex flex-wrap">
                        {
                            albums.map((album: Album, index: number) =>
                                <div className="col-20" key={index}>
                                    <LargeAlbumItem album={album} />
                                </div>)
                        }
                    </div>
                </ScrollArea>
            </div>
        );
    } else {
        let lastGenreId: number = -1;
        let elmTracks: JSX.Element[] = [];
        let index = 0;
        tracks.forEach(track => {
            if (lastGenreId === -1 || lastGenreId !== track.category.id) {
                lastGenreId = track.category.id;
                elmTracks.push(<GenreTitleHeader key={index++} title={track.category.name}/>);
            }
            elmTracks.push(<ListTrackItem track={track} key={index++}/>);
        });
        albumContent = (
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
        );
    }

    return (
        <div className="page">
            <div className="d-flex justify-content-between">
                <p className="page-title">All releases</p>
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
