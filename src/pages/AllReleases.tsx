import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { albumCountPerPage, trackCountPerPage } from '../consts';
import { ShowMode } from '../redux/store';
import { selectAllAlbumList, selectCurrentPage, selectShowMode, selectTracks } from '../redux/selectors';
import { requestAllAlbums, requestTracks, setCurrentPage, setShowMode } from '../redux/actions';

import AlbumPagination from '../components/AlbumPagination';
import { useParams } from 'react-router-dom';
import AlbumsGridView from '../components/AlbumsGridView';
import TracksListView from '../components/TracksListView';
import ShowModeSwitcher from '../components/ShowModeSwitcher';

export default function AllReleases() {
    const showMode = useSelector(selectShowMode);
    const albums = useSelector(selectAllAlbumList);
    const tracks = useSelector(selectTracks);
    let { publisherSlug } = useParams();
    const dispatch = useDispatch();
    const currentPage = useSelector(selectCurrentPage);

    useEffect(() => {
        dispatch(setShowMode(ShowMode.GRID));
        dispatch(setCurrentPage(0));
    }, [dispatch]);

    useEffect(() => {
        if (publisherSlug !== undefined) {
            dispatch(setShowMode(ShowMode.GRID));
        }
    }, [publisherSlug, dispatch]);

    useEffect(() => {
        if (showMode === ShowMode.GRID) {
            dispatch(requestAllAlbums(currentPage * albumCountPerPage, albumCountPerPage, publisherSlug || ''));
        } else {
            dispatch(requestTracks(currentPage * trackCountPerPage, trackCountPerPage, publisherSlug || ''));
        }
    }, [showMode, publisherSlug, dispatch, currentPage]);

    useEffect(() => {
        window.scrollTo({top: 0});
    }, [tracks, albums]);

    return (
        <div className="page">
            <div className="d-flex justify-content-between">
                <p className="page-title">{publisherSlug?albums[0]?.publisher.name:'All releases'}</p>
                <ShowModeSwitcher/>
            </div>
            { showMode === ShowMode.GRID?<AlbumsGridView albums={albums}/>:<TracksListView tracks={tracks}/> }
            <div className="d-flex justify-content-center align-items-center">
                <AlbumPagination/>
            </div>
        </div>
    );
}
