import React, {useEffect, useState} from 'react';
import {Button, Col, Row} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ScrollArea from 'react-scrollbar';
import {faThLarge, faThList} from '@fortawesome/free-solid-svg-icons';
import {selectShowMode, setShowMode, SHOW_MODE} from "../store";
import {useDispatch, useSelector} from 'react-redux';
import LargeAlbumItem from '../components/LargeAlbumItem';
import {scrollbarStyles} from '../consts';
import AlbumTitleHeader from '../components/AlbumTitleHeader';
import ListTrackItem from '../components/ListTrackItem';
import {Album, Track} from "../models";
import axios, {AxiosResponse} from "axios";
import AlbumPagination from "../components/AlbumPagination";

interface IAlbums {
    albums: Album[]
}

interface ITracks {
    tracks: Track[]
}

export default function AllReleases() {
    const showMode = useSelector(selectShowMode);
    const dispatch = useDispatch();
    const [albums, setAlbums] = useState<Album[]>([]);
    const [tracks, setTracks] = useState<Track[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const result: AxiosResponse<IAlbums> = await axios(
                '/api/albums'
            );
            setAlbums(result.data.albums);
        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            const result: AxiosResponse<ITracks> = await axios(
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
        let lastAlbumId: number = -1;
        tracks.forEach((track: Track) => {
            if (lastAlbumId === -1 || lastAlbumId !== track.album.id) {
                lastAlbumId = track.album.id;
                elmTracks.push(<AlbumTitleHeader key={index++} title={track.album.title} createdAt={track.album.release_date}/>);
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
