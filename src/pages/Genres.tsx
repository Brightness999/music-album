import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { albumCountPerPage, trackCountPerPage } from '../consts';
import AlbumPagination from '../components/AlbumPagination';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectAllAlbumList,
    selectCurrentPage,
    selectPageCount,
    selectShowMode,
    selectTracks
} from '../redux/selectors';
import { requestGenreAlbums, requestGenreTracks, requestTracks, setCurrentPage, setShowMode } from '../redux/actions';
import TracksListView from '../components/TracksListView';
import ShowModeSwitcher from '../components/ShowModeSwitcher';
import { ShowMode } from '../redux/store';
import AlbumsGridView from '../components/AlbumsGridView';

export default function GenresPage() {
    let { slug: categorySlug, page } = useParams();
    const tracks = useSelector(selectTracks);
    const albums = useSelector(selectAllAlbumList);
    const [category, setCategory] = useState('');
    const dispatch = useDispatch();
    const showMode = useSelector(selectShowMode);
    const currentPage = useSelector(selectCurrentPage);
    const pageCount = useSelector(selectPageCount);

    if (page && +page >= pageCount) {
        page = '0';
    }

    useEffect(() => {
        page && dispatch(setCurrentPage(+page));
    }, [page, dispatch]);

    useEffect(() => {
        dispatch(setCurrentPage(0));
    }, [dispatch, categorySlug]);

    useEffect(() => {
        if (categorySlug === undefined) {
            dispatch(setShowMode(ShowMode.LIST));
            dispatch(requestTracks(currentPage * trackCountPerPage, trackCountPerPage, ''));
        } else {
            if (showMode === ShowMode.LIST) {
                dispatch(requestGenreTracks(categorySlug, currentPage * trackCountPerPage, trackCountPerPage));
            } else {
                dispatch(requestGenreAlbums(currentPage * albumCountPerPage, albumCountPerPage, categorySlug));
            }
        }
    }, [categorySlug, dispatch, showMode, currentPage]);

    useEffect(() => {
        window.scrollTo({top: 0});
    }, [tracks, albums]);

    useEffect(() => {
        if (albums.length === 0) {
            return;
        }
        albums[0].categories.forEach(category => {
            if (category.slug === categorySlug) {
                setCategory(category.name);
            }
        });
    }, [albums, categorySlug]);

    return (
        <div className="page">
            <div className="d-flex justify-content-between">
                <p className="page-title">{ category }</p>
                <ShowModeSwitcher disableGridMode={categorySlug === undefined}/>
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
