import React from 'react';

import AlbumImage from "../assets/images/1.png";

export default function TopAlbumItem() {
    return (
        <div className="top-album-item pt-1 pb-1 pl-3">
            <div className="img-wrapper">
                <img src={AlbumImage}></img>
            </div>
            <div className="content ml-2">
                <div className="title">Nu Groove</div>
                <div className="desc">Luke Solomon, The visi...</div>
                <div className="desc">4 To The Floor Records</div>
            </div>
        </div>
    );
}