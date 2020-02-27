import React from 'react';

import TopAlbumItem from './TopAlbumItem';

export default function Sidebar() {
    return(
        <div className="sidebar">
            <div className="pt-4 pl-4 pb-5">Top 10 albums</div>
            <TopAlbumItem></TopAlbumItem>
            <TopAlbumItem></TopAlbumItem>
            <TopAlbumItem></TopAlbumItem>
            <TopAlbumItem></TopAlbumItem>
            <TopAlbumItem></TopAlbumItem>
            <TopAlbumItem></TopAlbumItem>
            <TopAlbumItem></TopAlbumItem>
            <TopAlbumItem></TopAlbumItem>
            <TopAlbumItem></TopAlbumItem>
            <TopAlbumItem></TopAlbumItem>
        </div>
    );
}