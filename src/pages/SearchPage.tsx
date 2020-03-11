import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { trackCountPerPage } from '../consts';
import { selectCurrentPage, selectPageCount, selectSearchModeValue, selectTracks } from '../redux/selectors';
import { requestSearch, setCurrentPage } from '../redux/actions';

import AlbumPagination from '../components/AlbumPagination';
import { useParams } from 'react-router-dom';
import TracksListView from '../components/TracksListView';

export default function SearchPage() {
    const tracks = useSelector(selectTracks);
    let { keyword, page } = useParams();
    const dispatch = useDispatch();
    const currentPage = useSelector(selectCurrentPage);
    const searchModeValue = useSelector(selectSearchModeValue);

    const pageCount = useSelector(selectPageCount);
    if (page && +page >= pageCount) {
        page = '0';
    }
    useEffect(() => {
        page && dispatch(setCurrentPage(+page));
    }, [page, dispatch]);

    useEffect(() => {
        dispatch(requestSearch(keyword?keyword:'', currentPage * trackCountPerPage, trackCountPerPage));
    }, [dispatch, keyword, currentPage]);

    useEffect(() => {
        window.scrollTo({top: 0});
    }, [tracks]);

    return (
        <div className="page">
            <div className="d-flex justify-content-between">
                <p className="page-title">{ searchModeValue }</p>
            </div>
            <TracksListView tracks={tracks}/>
            < div className="d-flex justify-content-center align-items-center">
                <AlbumPagination/>
            </div>
        </div>
    );
}
