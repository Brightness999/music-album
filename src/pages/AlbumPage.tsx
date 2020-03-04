import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import ScrollArea from 'react-scrollbar';
import { Col, Row } from 'reactstrap';

import { Track } from '../models';
import { scrollbarStyles } from '../consts';
import ListTrackItemDetail from '../components/ListTrackItemDetail';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentAlbumDetail, selectCurrentTrack, selectLoadingState, selectPlayStatus } from '../redux/selectors';
import { requestAlbumDetail, selectAlbumAsPlaylist, setPlayStatus } from '../redux/actions';
import { composeAlbumImagePath } from '../common';
import { LoadingState, PlayStatus } from '../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

export default function AlbumPage() {
    let { slug } = useParams();
    const album = useSelector(selectCurrentAlbumDetail);
    const currentTrack = useSelector(selectCurrentTrack);
    const playStatus = useSelector(selectPlayStatus);
    const loadingState = useSelector(selectLoadingState);

    const dispatch = useDispatch();
    useEffect(() => {
        if (slug === undefined) return;
        dispatch(requestAlbumDetail(slug));
    }, [slug, dispatch]);

    console.log(`loadingState=${loadingState}`);
    if (loadingState === LoadingState.LOADING) {
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
                <div
                    onClick={() => {
                        if (album?.slug === currentTrack?.album.slug) {
                            if (playStatus === PlayStatus.PLAYING) {
                                dispatch(setPlayStatus(PlayStatus.PAUSED));
                            } else {
                                dispatch(setPlayStatus(PlayStatus.PLAYING));
                            }
                        } else {
                            dispatch(selectAlbumAsPlaylist(album.slug));
                        }
                    }}
                    className="album-image-wrapper position-relative">
                    <img src={ composeAlbumImagePath(album?.location, album?.slug) } alt="album"/>
                    <div className="album-cover d-flex justify-content-center align-items-center">
                        <FontAwesomeIcon icon={
                            (album?.slug === currentTrack?.album.slug && playStatus === PlayStatus.PLAYING)?
                                faPause:
                                faPlay
                        }/>
                    </div>
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
                    minScrollSize={40}>
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
