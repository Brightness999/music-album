import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { albumCountPerPage, trackCountPerPage } from '../consts';
import AlbumPagination from '../components/AlbumPagination';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllAlbumList, selectCurrentPage, selectShowMode, selectTracks } from '../redux/selectors';
import {
    requestAllAlbums,
    requestGenreAlbums,
    requestGenreTracks,
    requestTracks,
    setCurrentPage
} from '../redux/actions';
import TracksListView from '../components/TracksListView';
import ShowModeSwitcher from '../components/ShowModeSwitcher';
import { ShowMode } from '../redux/store';
import AlbumsGridView from '../components/AlbumsGridView';

export default function GenresPage() {
    let { slug } = useParams();
    const tracks = useSelector(selectTracks);
    const albums = useSelector(selectAllAlbumList);
    const dispatch = useDispatch();
    const showMode = useSelector(selectShowMode);
    const currentPage = useSelector(selectCurrentPage);

    useEffect(() => {
        dispatch(setCurrentPage(0));
    }, [dispatch, slug]);

    useEffect(() => {
        if (slug === undefined) {
            if (showMode === ShowMode.LIST) {
                dispatch(requestTracks(currentPage * trackCountPerPage, trackCountPerPage, ''));
            }else {
                dispatch(requestAllAlbums(currentPage * albumCountPerPage, albumCountPerPage, ''));
            }
        } else {
            if (showMode === ShowMode.LIST) {
                dispatch(requestGenreTracks(slug, currentPage * trackCountPerPage, trackCountPerPage));
            } else {
                dispatch(requestGenreAlbums(currentPage * albumCountPerPage, albumCountPerPage, slug));
            }
        }
    }, [slug, dispatch, showMode, currentPage]);

    useEffect(() => {
        window.scrollTo({top: 0});
    }, [tracks, albums]);

    return (
        <div className="page">
            <div className="d-flex justify-content-end">
                <ShowModeSwitcher/>
            </div>
            {
                showMode === ShowMode.LIST?<TracksListView tracks={tracks}/>:<AlbumsGridView albums={albums}/>
            }
            <div className="d-flex justify-content-center align-items-center">
                <AlbumPagination/>
            </div>
        </div>
    );
}
