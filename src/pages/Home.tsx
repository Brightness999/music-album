import React from 'react';
import LargeAlbumItem from '../components/LargeAlbumItem';
import { Row } from 'reactstrap';

export default function Home() {
    return (
        <div className="page">
            <p className="page-title">Featured releases</p>
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
        </div>
    );
}