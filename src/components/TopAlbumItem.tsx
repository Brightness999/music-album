import React from 'react';

import {Album} from "../models";

interface IProps {
    album: Album;
}

export default function TopAlbumItem(props: IProps) {
    return (
        <div className="top-album-item pt-1 pb-1 pl-3">
            <div className="img-wrapper">
                <img src={`/uploads/albums/${props.album.location}/thumb/${props.album.slug}.jpg`} alt="album"></img>
            </div>
            <div className="content ml-2">
                <div className="title">{props.album.title}</div>
                <div className="desc">{props.album.publisher.name}</div>
                <div className="desc">{props.album.artist.name}</div>
            </div>
        </div>
    );
}