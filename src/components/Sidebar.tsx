import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Album } from '../models';
import TopAlbumItem from './TopAlbumItem';
import { selectTopAlbums } from '../redux/selectors';
import { requestTopAlbums } from '../redux/actions';

export default function Sidebar() {
    const topAlbums = useSelector(selectTopAlbums);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(requestTopAlbums());
    }, [dispatch]);
    return(
        <div className="sidebar position-fixed position-absolute">
            <div className="pt-4 pl-4 pb-3">Top {topAlbums.length} albums</div>
            {
                topAlbums.map((album: Album, index: number) => <TopAlbumItem album={album} key={index}/>)
            }
        </div>
    );
}
