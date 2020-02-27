import React from 'react';
import AlbumAvatar from '../assets/images/1.png';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

export default function LargeAlbumItem() {
    return (
        <Card>
            <CardImg top src={AlbumAvatar} alt="album" />
            <CardBody>
                <CardTitle>Strong Feelings EP</CardTitle>
                <CardSubtitle>Wheats</CardSubtitle>
                <CardText>Saved Records</CardText>
            </CardBody>
        </Card>
    );
}