import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faThList } from '@fortawesome/free-solid-svg-icons';
import ScrollArea from 'react-scrollbar';
import axios, { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { scrollbarStyles } from '../consts';
import { Album, Track } from '../models';
import { selectShowMode, setShowMode, SHOW_MODE } from '../store';
import ListTrackItem from '../components/ListTrackItem';
import GenreTitleHeader from '../components/GenreTitleHeader';
import AlbumPagination from '../components/AlbumPagination';
import LargeAlbumItem from '../components/LargeAlbumItem';

interface AlbumsResponse {
    albums: Album[]
}

interface TracksResponse {
    tracks: Track[]
}

export default function AllReleases() {
    const showMode = useSelector(selectShowMode);
    const dispatch = useDispatch();
    const [albums, setAlbums] = useState<Album[]>([]);
    const [tracks, setTracks] = useState<Track[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const result: AxiosResponse<AlbumsResponse> = await axios(
                '/api/albums'
            );
            setAlbums(result.data.albums);
        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            const result: AxiosResponse<TracksResponse> = await axios(
                '/api/tracks'
            );
            setTracks(result.data.tracks);
        };
        fetchData();

    }, []);
    let albumContent;
    if (showMode === SHOW_MODE.GRID) {
        let index = 0;
        let elmAlbums: JSX.Element[] = [];
        albums.forEach((album: Album) => {
           elmAlbums.push(<div className="col-20" key={index++}><LargeAlbumItem album={album} /></div>);
        });
        albumContent = (
            <div className="album-content">
                <ScrollArea
                    className="scroll-area"
                    verticalScrollbarStyle={scrollbarStyles}
                    verticalContainerStyle={scrollbarStyles}
                    horizontal={false}
                    smoothScrolling= {true}
                    minScrollSize={40}
                >
                    <div className="d-flex flex-wrap">
                        {elmAlbums}
                    </div>
                </ScrollArea>
            </div>
        );
    } else {
        let index = 0;
        let elmTracks: JSX.Element[] = [];
        let lastGenreId: number = -1;
        tracks.forEach((track: Track) => {
            if (lastGenreId === -1 || lastGenreId !== track.category.id) {
                lastGenreId = track.category.id;
                elmTracks.push(<GenreTitleHeader key={index++} title={track.category.name}/>);
            }
            elmTracks.push(<ListTrackItem track={track} />);
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
                    minScrollSize={40}
                >
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
                    <Button className="hl-control normal-control" active={showMode === SHOW_MODE.GRID} onClick={() => dispatch && dispatch(setShowMode(SHOW_MODE.GRID))}>
                        <FontAwesomeIcon icon={faThLarge} />&nbsp;&nbsp;Grid
                    </Button>
                    <Button className="hl-control normal-control" active={showMode === SHOW_MODE.LIST} onClick={() => dispatch && dispatch(setShowMode(SHOW_MODE.LIST))}>
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
