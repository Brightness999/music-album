import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { IAlbum } from '../interfaces';

interface IProps {
    album: IAlbum;
}

export default function LargeAlbumItem(props: IProps) {
    return (
        <Card>
            <CardImg top src={`uploads/albums/${props.album.location}/thumb/${props.album.slug}.jpg`} alt="album" />
            <CardBody>
                <CardTitle>{props.album.title}</CardTitle>
                <CardSubtitle>{props.album.catalog}</CardSubtitle>
                <CardText>{props.album.artist.name}</CardText>
            </CardBody>
        </Card>
    );
}