import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Album } from '../models';
import { selectAlbumAsPlaylist, setPlayStatus } from '../redux/actions';
import { composeAlbumImagePath } from '../common';
import { selectCurrentTrack, selectPlayStatus } from '../redux/selectors';
import { PlayStatus } from '../redux/store';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

interface Props {
    album: Album;
}

export default function LargeAlbumItem(props: Props) {
    const dispatch = useDispatch();
    const currentTrack = useSelector(selectCurrentTrack);
    const playStatus = useSelector(selectPlayStatus);
    return (
        <Card>
            <div
                onClick={() => {
                    if (props.album.slug === currentTrack?.album.slug) {
                        if (playStatus === PlayStatus.PLAYING) {
                            dispatch(setPlayStatus(PlayStatus.PAUSED));
                        } else {
                            dispatch(setPlayStatus(PlayStatus.PLAYING));
                        }
                    } else {
                        dispatch(selectAlbumAsPlaylist(props.album.slug));
                    }
                }}
                className="position-relative d-flex">
                <CardImg top
                         src={ composeAlbumImagePath(props.album.location, props.album.slug) }
                         alt="album"/>
                <div className="album-cover d-flex justify-content-center align-items-center">
                    <FontAwesomeIcon icon={
                        (props.album.slug === currentTrack?.album.slug && playStatus === PlayStatus.PLAYING)?
                            faPause:
                            faPlay
                    }/>
                </div>
            </div>
            <CardBody>
                <CardTitle><NavLink to={ "/album/"+props.album.slug } className="genre-link">{ props.album.title.replace('&amp;', '&') }</NavLink></CardTitle>
                <CardSubtitle>{ props.album.artist.name }</CardSubtitle>
                <CardText>
                    <NavLink to={`/all-releases/${props.album.publisher.slug}/s/GRID/p/0`} className="genre-link">{ props.album.publisher.name }</NavLink>
                </CardText>
            </CardBody>
        </Card>
    );
}
