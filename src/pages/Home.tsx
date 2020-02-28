import React from 'react';
import LargeAlbumItem from '../components/LargeAlbumItem';
import ScrollArea from 'react-scrollbar';

import { scrollbarStyles } from '../consts';

export default function Home() {

    return (
        <div className="page">
            <p className="page-title">Featured releases</p>
            <div className="album-content">
                <ScrollArea
                    className="scroll-area"
                    verticalScrollbarStyle={scrollbarStyles}
                    verticalContainerStyle={scrollbarStyles}
                    horizontal={false}
                    smoothScrolling= {true}
                    minScrollSize={40}
                >
                    <div className="d-flex flex-wrap">
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                        <div className="col-20"><LargeAlbumItem></LargeAlbumItem></div>
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}