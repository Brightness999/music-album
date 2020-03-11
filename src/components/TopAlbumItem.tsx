import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import { Album } from '../models';
import { selectAlbumAsPlaylist } from '../redux/actions';
import { composeAlbumImagePath } from '../common';

interface Props {
    album: Album;
}

export default function TopAlbumItem(props: Props) {
    const dispatch = useDispatch();
    return (
        <div className="top-album-item pt-1 pb-1 pl-3">
            <div
                onClick={ () => dispatch(selectAlbumAsPlaylist(props.album.slug)) }
                className="img-wrapper position-relative d-flex">
                <img src={ composeAlbumImagePath(props.album.location, props.album.slug) } alt="album"/>
                <div className="w-100 h-100 d-flex justify-content-center align-items-center album-cover">
                    <FontAwesomeIcon icon={ faPlay }/>
                </div>
            </div>
            <div className="content ml-2">
                <div className="title pr-2">
                    <NavLink to={"/album/"+props.album.slug}>{props.album.title}</NavLink>
                </div>
                <div className="desc">{props.album.artist.name}</div>
                <div className="desc">
                    <NavLink to={`/all-releases/${props.album.publisher.slug}/s/GRID/p/0`} className="genre-link">
                        { props.album.publisher.name }
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
