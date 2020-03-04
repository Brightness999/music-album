import React, { useEffect } from 'react';

import { Album } from '../models';
import LargeAlbumItem from '../components/LargeAlbumItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectFeaturedAlbumList } from '../redux/selectors';
import { requestFeaturedAlbums } from '../redux/actions';


export default function Home() {
    const featuredAlbums = useSelector(selectFeaturedAlbumList);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(requestFeaturedAlbums());
    }, [dispatch]);
    return (
        <div className="page">
            <p className="page-title">Featured releases</p>
            <div className="album-content">
                <div className="d-flex flex-wrap">
                    {
                        featuredAlbums?.map((album: Album, index: number) =>
                            <div className="col-20" key={index++}><LargeAlbumItem album={album} /></div>)
                    }
                </div>
            </div>
        </div>
    );
}
