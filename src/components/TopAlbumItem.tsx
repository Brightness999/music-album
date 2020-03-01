import React from 'react';
import {NavLink} from "react-router-dom";

import {Album} from "../models";

interface IProps {
    album: Album;
}

export default function TopAlbumItem(props: IProps) {
    return (
        <div className="top-album-item pt-1 pb-1 pl-3">
            <div className="img-wrapper">
                <img src={`/uploads/albums/${props.album.location}/thumb/${props.album.slug}.jpg`} alt="album"/>
            </div>
            <div className="content ml-2">
                <div className="title">
                    <NavLink to={"/album/"+props.album.slug}>{props.album.title}</NavLink>
                </div>
                <div className="desc">{props.album.publisher.name}</div>
                <div className="desc">{props.album.artist.name}</div>
            </div>
        </div>
    );
}