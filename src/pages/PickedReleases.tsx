import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { albumCountPerPage } from '../consts';
import { ShowMode } from '../redux/store';
import { selectAllAlbumList, selectCurrentPage, selectPageCount } from '../redux/selectors';
import { requestPickedAlbums, setCurrentPage, setShowMode } from '../redux/actions';

import AlbumPagination from '../components/AlbumPagination';
import AlbumsGridView from '../components/AlbumsGridView';
import { titleCase } from '../utils';

interface Props {
  type: string;
}

export default function PickedReleases(props: Props) {
  const albums = useSelector(selectAllAlbumList);
  let { publisherSlug, showMode, page } = useParams();
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const pageCount = useSelector(selectPageCount);
  if (page && +page >= pageCount) {
    page = '0';
  }
  useEffect(() => {
    if (showMode === ShowMode.GRID || showMode === ShowMode.LIST) {
      dispatch(setShowMode(showMode));
    }
  }, [showMode, dispatch]);

  useEffect(() => {
    page && dispatch(setCurrentPage(+page));
  }, [page, dispatch]);

  useEffect(() => {
    if (publisherSlug !== undefined) {
      dispatch(setShowMode(ShowMode.GRID));
    }
  }, [publisherSlug, dispatch]);

  useEffect(() => {
    dispatch(requestPickedAlbums(props.type, currentPage * albumCountPerPage, albumCountPerPage, publisherSlug || ''));
  }, [showMode, publisherSlug, dispatch, currentPage, props.type]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [albums]);

  return (
    <div className="page">
      <div className="d-flex justify-content-between">
        <p className="page-title">{titleCase(props.type)}</p>
      </div>
      <AlbumsGridView albums={albums}/>
      <div className="d-flex justify-content-center align-items-center">
        <AlbumPagination/>
      </div>
    </div>
  );
}
