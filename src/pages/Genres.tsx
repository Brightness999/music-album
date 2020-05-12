import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { albumCountPerPage, trackCountPerPage } from '../consts';
import AlbumPagination from '../components/AlbumPagination';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllAlbumList, selectCurrentPage, selectPageCount, selectTracks } from '../redux/selectors';
import { requestGenreAlbums, requestGenreTracks, requestTracks, setCurrentPage, setShowMode } from '../redux/actions';
import TracksListView from '../components/TracksListView';
import ShowModeSwitcher from '../components/ShowModeSwitcher';
import { ShowMode } from '../redux/store';
import AlbumsGridView from '../components/AlbumsGridView';
import { Helmet } from 'react-helmet';

export default function GenresPage() {
    let { slug: categorySlug, showMode, page } = useParams();
    const tracks = useSelector(selectTracks);
    const albums = useSelector(selectAllAlbumList);
    const [category, setCategory] = useState('');
    const dispatch = useDispatch();
    const currentPage = useSelector(selectCurrentPage);
    const pageCount = useSelector(selectPageCount);

    useEffect(() => {
        if (showMode === ShowMode.GRID || showMode === ShowMode.LIST) {
            dispatch(setShowMode(showMode));
        }
    }, [showMode, dispatch]);

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
        if (tracks.length === 0) {
            return;
        }
        setCategory(tracks[0].category.name);
    }, [tracks, albums]);

    return (
        <div className="page">
            <Helmet>
                <title>{category}</title>
                <meta name="description" content={`Check out ${category} genre`}/>
                <meta name="description" content={`Check out ${category} category`}/>
                <meta name="robots" content="index, follow"/>
                <meta name="google-site-verification" content="XBgyEbaQOjMrVRy8GjP1qG8aR4mQRHESuIQxqOgZJLo" />
            </Helmet>
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
