import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { Album } from '../models';

interface IProps {
    album: Album;
}

export default function LargeAlbumItem(props: IProps) {
    return (
        <Card>
            <CardImg top src={`/uploads/albums/${props.album.location}/thumb/${props.album.slug}.jpg`} alt="album" />
            <CardBody>
                <CardTitle><NavLink to={"/album/"+props.album.slug}>{props.album.title}</NavLink></CardTitle>
                <CardSubtitle>{props.album.catalog}</CardSubtitle>
                <CardText>{props.album.artist.name}</CardText>
            </CardBody>
        </Card>
    );
}