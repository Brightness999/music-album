import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

import { Track } from '../models';
import ListTrackItemDetail from '../components/ListTrackItemDetail';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentAlbumDetail, selectCurrentTrack, selectLoadingState, selectPlayStatus } from '../redux/selectors';
import { requestAlbumDetail, selectAlbumAsPlaylist, setPlayStatus } from '../redux/actions';
import { composeAlbumImagePath } from '../common';
import { LoadingState, PlayStatus } from '../redux/store';
import AlbumDownloadButton from '../components/AlbumDownloadButton';
import { MusicFileType } from '../types';

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

    if (loadingState === LoadingState.LOADING) {
        return <div>Loading...</div>;
    }

    let genres: JSX.Element[] = [];
    let index = 0;
    const categoryCount = album?.categories.length || 0;
    for (let i = 0; i < categoryCount; i++)
    {
        genres.push(<NavLink to={`/genres/${album?.categories[i].slug}`} key={index++} className="genre-link">{album?.categories[i].name}</NavLink>);
        if (i !== categoryCount-1) {
            genres.push(<span key={index++}>, </span>);
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
                    <div className="pb-2">
                        Label:&nbsp;
                        <NavLink to={`/all-releases/${album?.publisher.slug}`} className="genre-link">
                            { album?.publisher.name }
                        </NavLink>
                    </div>
                    <div className="pb-2">Catalog #: {album?.catalog}</div>
                    <div className="pb-2">Date: {album?.release_date}</div>
                    <div className="pb-2">Genres: {genres}</div>
                    <div className="d-flex">
                        <AlbumDownloadButton type={MusicFileType.MP3} album={album} className="mr-2"/>
                        <AlbumDownloadButton type={MusicFileType.FLAC} album={album} />
                        <div className="flex-grow-1"/>
                    </div>
                </div>
            </Row>
            <Row className="album-header d-flex pt-2">
                <Col sm={5}>Artist & Title</Col>
                <Col sm={2}>Genre</Col>
                <Col sm={2}>Length</Col>
                <Col sm={3} className="d-flex justify-content-around align-items-center" />
            </Row>
            <div className="flex-grow-1 pb-2 tracks-container">
                {
                    album?.tracks.map((track: Track, index: number) =>
                        <ListTrackItemDetail
                            track={track}
                            key={index}
                            album_slug={album?.slug}
                            album_location={album?.location}
                            artist={album?.artist}/>)
                }
            </div>
        </div>
    );
}
