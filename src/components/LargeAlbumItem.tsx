import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import { Album } from '../models';
import { selectAlbumAsPlaylist } from '../redux/actions';
import { composeAlbumImagePath } from '../common';

interface Props {
    album: Album;
}

export default function LargeAlbumItem(props: Props) {
    const dispatch = useDispatch();
    return (
        <Card>
            <div
                onClick={ () => dispatch(selectAlbumAsPlaylist(props.album.slug)) }
                className="position-relative d-flex">
                <CardImg top
                         src={ composeAlbumImagePath(props.album.location, props.album.slug) }
                         alt="album"/>
                <div className="album-cover d-flex justify-content-center align-items-center">
                    <FontAwesomeIcon icon={

                        faPlay
                    }/>
                </div>
            </div>
            <CardBody>
                <CardTitle><NavLink to={ "/album/"+props.album.slug }>{ props.album.title }</NavLink></CardTitle>
                <CardSubtitle>{ props.album.artist.name }</CardSubtitle>
                <CardText>{ props.album.publisher.name }</CardText>
            </CardBody>
        </Card>
    );
}
