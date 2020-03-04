import { call, put, takeLatest } from 'redux-saga/effects'
import { apiFetchAlbumDetail, apiFetchAllAlbums, apiFetchFeaturedAlbums, apiFetchTopAlbums } from '../api/AlbumAPI';
import {
    ALBUM_DETAIL_REQUESTED,
    ALL_ALBUMS_REQUESTED, CATEGORIES_REQUESTED,
    FEATURED_ALBUMS_REQUESTED, GENRE_TRACKS_REQUESTED,
    RequestAlbumDetail, RequestAllAlbums, RequestGenreTracks,
    RequestTrack, RequestTracks,
    SELECT_ALBUM_AS_PLAY_LIST,
    SelectAlbumAsPlaylist,
    setAllAlbums, setCategories,
    setCurrentAlbumDetail, setCurrentPage,
    setCurrentTrack,
    setFeaturedAlbums,
    setLoadingState, setPageCount,
    setPlayList,
    setTopAlbums,
    setTracks,
    TOP_ALBUMS_REQUESTED,
    TRACK_REQUESTED,
    TRACKS_REQUESTED
} from './actions';
import { apiFetchGenreTracks, apiFetchTrack, apiFetchTracks } from '../api/TrackAPI';
import { Track } from '../models';
import { LoadingState } from './store';
import { apiFetchCategories } from '../api/CategoriAPI';
import { albumCountPerPage, trackCountPerPage } from '../consts';

function* fetchAllAlbums(action: RequestAllAlbums) {
    try {
        const [albums, albumCount] = yield call(apiFetchAllAlbums, action.skip, action.limit);
        yield put(setAllAlbums(albums));
        yield put(setPageCount(Math.ceil(albumCount / albumCountPerPage)));
        if (albums.length === 0) {
            yield put(setCurrentPage(0));
        }
    } catch (e) {
        yield put(setAllAlbums([]));
    }
}

function* fetchTopAlbums() {
    try {
        const albums = yield call(apiFetchTopAlbums);
        yield put(setTopAlbums(albums));
    } catch (e) {
        yield put(setTopAlbums([]));
    }
}

function* fetchFeaturedAlbums() {
    try {
        const albums = yield call(apiFetchFeaturedAlbums);
        yield put(setFeaturedAlbums(albums));
    } catch (e) {
        yield put(setFeaturedAlbums([]));
    }
}

function* fetchTracks(action: RequestTracks) {
    try {
        const [tracks, trackCount] = yield call(apiFetchTracks, action.skip, action.limit);
        yield put(setTracks(tracks));
        yield put(setPageCount(Math.ceil(trackCount / trackCountPerPage)));
        if (tracks.length === 0) {
            yield put(setCurrentPage(0));
        }
    } catch (e) {
        yield put(setTracks([]));
    }
}

function* fetchGenreTracks(action: RequestGenreTracks) {
    try {
        const tracks = yield call(apiFetchGenreTracks, action.slug);
        yield put(setTracks(tracks));
    } catch (e) {
        yield put(setTracks([]));
    }
}

function* fetchAlbumDetail(action: RequestAlbumDetail) {
    try {
        yield put(setLoadingState(LoadingState.LOADING));
        const album = yield call(apiFetchAlbumDetail, action.slug);
        yield put(setCurrentAlbumDetail(album));
        yield put(setLoadingState(LoadingState.LOADED));
    } catch (e) { }
}

function* fetchTrack(action: RequestTrack) {
    try {
        const track = yield call(apiFetchTrack, action.slug);
        yield put(setCurrentTrack(track));
    } catch (e) { }
}

function* selectAlbumAsPlaylist(action: SelectAlbumAsPlaylist) {
    const album = yield call(apiFetchAlbumDetail, action.slug);
    const play_list = album.tracks.map((track: Track) => track.slug);
    yield put(setPlayList(play_list));
}

function* fetchCategories() {
    try {
        const categories = yield call(apiFetchCategories);
        yield put(setCategories(categories));
    } catch (e) { }
}

function* appSaga() {
    yield takeLatest(ALL_ALBUMS_REQUESTED, fetchAllAlbums);
    yield takeLatest(FEATURED_ALBUMS_REQUESTED, fetchFeaturedAlbums);
    yield takeLatest(TRACKS_REQUESTED, fetchTracks);
    yield takeLatest(ALBUM_DETAIL_REQUESTED, fetchAlbumDetail);
    yield takeLatest(TRACK_REQUESTED, fetchTrack);
    yield takeLatest(SELECT_ALBUM_AS_PLAY_LIST, selectAlbumAsPlaylist);
    yield takeLatest(TOP_ALBUMS_REQUESTED, fetchTopAlbums);
    yield takeLatest(GENRE_TRACKS_REQUESTED, fetchGenreTracks);
    yield takeLatest(CATEGORIES_REQUESTED, fetchCategories);
}

export default appSaga;
