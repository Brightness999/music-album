import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import ScrollArea from 'react-scrollbar';
import { Col, Row } from 'reactstrap';

import { DetailAlbumResponse, DetailAlbum, Track } from '../models';
import { scrollbarStyles } from '../consts';
import ListTrackItemDetail from '../components/ListTrackItemDetail';

export default function AlbumPage() {
    let { slug } = useParams();
    const history = useHistory();
    const [album, setAlbum] = useState<DetailAlbum>();
    useEffect(() => {
        const fetchData = async () => {
            const result: AxiosResponse<DetailAlbumResponse> = await axios(`/api/album/${slug}`);
            setAlbum(result.data.album);
            if (result.data.album === null ) {
                history.push('/');
            }
        };
        fetchData();
    }, [history, slug]);
    if (album === null ){
        return <div>Loading...</div>;
    }
    let artists: string|undefined;
    let genres: JSX.Element[] = [];

    artists = album?.artist.name;
    const categoryCount = album?.categories.length || 0;
    for (let i = 0; i < categoryCount; i++)
    {
        genres.push(<NavLink to={`/genres/${album?.categories[i].slug}`} key={i} className="genre-link">{album?.categories[i].name}</NavLink>);
        if (i !== categoryCount-1) {
            genres.push(<span>, </span>);
        }
    }

    return (
        <div className="page album-page">
            <p className="album-title">{album?.title}</p>
            <Row>
                <div className="album-image-wrapper">
                    <img src={`/uploads/albums/${album?.location}/thumb/${album?.slug}.jpg`} alt="album"/>
                </div>
                <div className="pl-3 pt-3 description">
                    <div className="pb-2">Artists: {artists}</div>
                    <div className="pb-2">Label: {album?.publisher.name}</div>
                    <div className="pb-2">Catalog #: {album?.catalog}</div>
                    <div className="pb-2">Date: {album?.release_date}</div>
                    <div className="pb-2">Genres: {genres}</div>
                </div>
            </Row>
            <Row className="album-header d-flex pt-2">
                <Col sm={5}>Artist & Title</Col>
                <Col sm={2}>Genre</Col>
                <Col sm={1}>BPM</Col>
                <Col sm={1}>Length</Col>
                <Col sm={3} className="d-flex justify-content-around align-items-center" />
            </Row>
            <div className="flex-grow-1 pb-2 tracks-container">
                <ScrollArea
                    className="scroll-area"
                    verticalScrollbarStyle={scrollbarStyles}
                    verticalContainerStyle={scrollbarStyles}
                    horizontal={false}
                    smoothScrolling= {true}
                    minScrollSize={40}
                >
                    {
                        album?.tracks.map((track: Track, index: number) =>
                            <ListTrackItemDetail
                                track={track}
                                key={index}
                                album_slug={album?.slug}
                                album_location={album?.location}
                                artist={album?.artist}/>)
                    }
                </ScrollArea>
            </div>
        </div>
    );
}
