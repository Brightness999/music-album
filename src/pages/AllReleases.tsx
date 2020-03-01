import React, {useEffect, useState} from 'react';
import { Button, Pagination, PaginationItem, PaginationLink, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScrollArea from 'react-scrollbar';
import { faThLarge, faThList, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { setShowMode, SHOW_MODE, selectShowMode } from "../store";
import { useSelector, useDispatch } from 'react-redux';
import LargeAlbumItem from '../components/LargeAlbumItem';
import { scrollbarStyles } from '../consts';
import AlbumTitleHeader from '../components/AlbumTitleHeader';
import ListTrackItem from '../components/ListTrackItem';
import {IAlbum} from "../interfaces";
import axios, {AxiosResponse} from "axios";

export interface IAlbums {
    albums: []
}

export default function AllReleases() {
    const showMode = useSelector(selectShowMode);
    const dispatch = useDispatch();
    const [albums, setAlbums] = useState<IAlbum[]>([]);
    useEffect(() => {
        if (showMode === SHOW_MODE.GRID) {
            const fetchData = async () => {
                const result: AxiosResponse<IAlbums> = await axios(
                    'api/albums'
                );
                setAlbums(result.data.albums);
            };
            fetchData();
        }
    }, []);
    let albumContent;
    if (showMode === SHOW_MODE.GRID) {
        let index = 0;
        let elmAlbums: JSX.Element[] = [];
        albums.forEach((album: IAlbum) => {
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
        albumContent = (
            <div className="album-content">
                <Row className="album-header d-flex">
                    <Col sm={5}>Artist & Title</Col>
                    <Col sm={2}>Label</Col>
                    <Col sm={2}>Genre</Col>
                    <Col sm={3} className="d-flex justify-content-around align-items-center">
                        <div>.mp3</div>
                        <div>.flac</div>
                    </Col>
                </Row>
                <ScrollArea
                    className="scroll-area"
                    verticalScrollbarStyle={scrollbarStyles}
                    verticalContainerStyle={scrollbarStyles}
                    horizontal={false}
                    smoothScrolling= {true}
                    minScrollSize={40}
                >
                    <AlbumTitleHeader title="Progressive House" createdAt="16 Oct 2019"/>
                    <ListTrackItem artist="Martin Ikin" title="Following feat. Haylay May (Original Mix)" label="Toolroom" genre="Progressive House" />
                    <ListTrackItem artist="Martin Ikin" title="Following feat. Haylay May (Original Mix)" label="Toolroom" genre="Progressive House" />
                    <ListTrackItem artist="Martin Ikin" title="Following feat. Haylay May (Original Mix)" label="Toolroom" genre="Progressive House" />
                    <ListTrackItem artist="Martin Ikin" title="Following feat. Haylay May (Original Mix)" label="Toolroom" genre="Progressive House" />
                    <AlbumTitleHeader title="Techno" createdAt="16 Oct 2019"/>
                    <ListTrackItem artist="Martin Ikin" title="Following feat. Haylay May (Original Mix)" label="Toolroom" genre="Progressive House" />
                    <ListTrackItem artist="Martin Ikin" title="Following feat. Haylay May (Original Mix)" label="Toolroom" genre="Progressive House" />
                    <ListTrackItem artist="Martin Ikin" title="Following feat. Haylay May (Original Mix)" label="Toolroom" genre="Progressive House" />
                    <ListTrackItem artist="Martin Ikin" title="Following feat. Haylay May (Original Mix)" label="Toolroom" genre="Progressive House" />
                    <ListTrackItem artist="Martin Ikin" title="Following feat. Haylay May (Original Mix)" label="Toolroom" genre="Progressive House" />
                    <ListTrackItem artist="Martin Ikin" title="Following feat. Haylay May (Original Mix)" label="Toolroom" genre="Progressive House" />
                    <AlbumTitleHeader title="Tech House" createdAt="16 Oct 2019"/>
                    <ListTrackItem artist="Martin Ikin" title="Following feat. Haylay May (Original Mix)" label="Toolroom" genre="Progressive House" />
                    <ListTrackItem artist="Martin Ikin" title="Following feat. Haylay May (Original Mix)" label="Toolroom" genre="Progressive House" />
                    <AlbumTitleHeader title="Deep House" createdAt="16 Oct 2019"/>
                    <ListTrackItem artist="Martin Ikin" title="Following feat. Haylay May (Original Mix)" label="Toolroom" genre="Progressive House" />
                    <ListTrackItem artist="Martin Ikin" title="Following feat. Haylay May (Original Mix)" label="Toolroom" genre="Progressive House" />
                    <ListTrackItem artist="Martin Ikin" title="Following feat. Haylay May (Original Mix)" label="Toolroom" genre="Progressive House" />
                    <ListTrackItem artist="Martin Ikin" title="Following feat. Haylay May (Original Mix)" label="Toolroom" genre="Progressive House" />
                    <ListTrackItem artist="Martin Ikin" title="Following feat. Haylay May (Original Mix)" label="Toolroom" genre="Progressive House" />
                    <ListTrackItem artist="Martin Ikin" title="Following feat. Haylay May (Original Mix)" label="Toolroom" genre="Progressive House" />
                    <ListTrackItem artist="Martin Ikin" title="Following feat. Haylay May (Original Mix)" label="Toolroom" genre="Progressive House" />
                    <ListTrackItem artist="Martin Ikin" title="Following feat. Haylay May (Original Mix)" label="Toolroom" genre="Progressive House" />
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
                <Pagination size="sm">
                    <PaginationItem>
                        <PaginationLink previous href="#">
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                        1
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                        2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                        3
                        </PaginationLink>
                    </PaginationItem>
                    ...
                    <PaginationItem>
                        <PaginationLink href="#">
                        67
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                        68
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                        69
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink next href="#">
                        <FontAwesomeIcon icon={faChevronRight} />
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>
            </div>
        </div>
    );
}
