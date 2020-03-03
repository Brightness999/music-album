import { call, put, takeLatest, take } from 'redux-saga/effects'
import { apiFetchAlbumDetail, apiFetchAllAlbums, apiFetchFeaturedAlbums } from '../api/AlbumAPI';
import {
    ActionType,
    ALBUM_DETAIL_REQUESTED,
    ALL_ALBUMS_REQUESTED,
    FEATURED_ALBUMS_REQUESTED,
    RequestAlbumDetail,
    setAllAlbums,
    setCurrentAlbumDetail,
    setFeaturedAlbums,
    setTracks,
    TRACKS_REQUESTED
} from './actions';
import { apiFetchTracks } from '../api/TrackAPI';

function* fetchAllAlbums() {
    try {
        const albums = yield call(apiFetchAllAlbums);
        yield put(setAllAlbums(albums));
    } catch (e) {
        yield put(setAllAlbums([]));
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

function* fetchTracks() {
    try {
        const tracks = yield call(apiFetchTracks);
        yield put(setTracks(tracks));
    } catch (e) {
        yield put(setTracks([]));
    }
}

function* fetchAlbumDetail(action: RequestAlbumDetail) {
    try {
        const album = yield call(apiFetchAlbumDetail, action.slug);
        yield put(setCurrentAlbumDetail(album));
    } catch (e) { }
}

function* mySaga() {

    yield takeLatest(ALL_ALBUMS_REQUESTED, fetchAllAlbums);
    yield takeLatest(FEATURED_ALBUMS_REQUESTED, fetchFeaturedAlbums);
    yield takeLatest(TRACKS_REQUESTED, fetchTracks);
    yield takeLatest(ALBUM_DETAIL_REQUESTED, fetchAlbumDetail);
}

export default mySaga;
