import { call, put, takeLatest } from 'redux-saga/effects'
import { apiFetchAlbumDetail, apiFetchAllAlbums, apiFetchFeaturedAlbums, apiFetchTopAlbums } from '../api/AlbumAPI';
import {
    ALBUM_DETAIL_REQUESTED,
    ALL_ALBUMS_REQUESTED,
    FEATURED_ALBUMS_REQUESTED,
    RequestAlbumDetail,
    RequestTrack,
    SELECT_ALBUM_AS_PLAY_LIST,
    SelectAlbumAsPlaylist,
    setAllAlbums,
    setCurrentAlbumDetail,
    setCurrentTrack,
    setFeaturedAlbums,
    setLoadingState,
    setPlayList,
    setTopAlbums,
    setTracks,
    TOP_ALBUMS_REQUESTED,
    TRACK_REQUESTED,
    TRACKS_REQUESTED
} from './actions';
import { apiFetchTrack, apiFetchTracks } from '../api/TrackAPI';
import { Track } from '../models';
import { LoadingState } from './store';

function* fetchAllAlbums() {
    try {
        const albums = yield call(apiFetchAllAlbums);
        yield put(setAllAlbums(albums));
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

function* fetchTracks() {
    try {
        yield put(setLoadingState(LoadingState.LOADING));
        const tracks = yield call(apiFetchTracks);
        yield put(setTracks(tracks));
        yield put(setLoadingState(LoadingState.LOADED));
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

function* appSaga() {
    yield takeLatest(ALL_ALBUMS_REQUESTED, fetchAllAlbums);
    yield takeLatest(FEATURED_ALBUMS_REQUESTED, fetchFeaturedAlbums);
    yield takeLatest(TRACKS_REQUESTED, fetchTracks);
    yield takeLatest(ALBUM_DETAIL_REQUESTED, fetchAlbumDetail);
    yield takeLatest(TRACK_REQUESTED, fetchTrack);
    yield takeLatest(SELECT_ALBUM_AS_PLAY_LIST, selectAlbumAsPlaylist);
    yield takeLatest(TOP_ALBUMS_REQUESTED, fetchTopAlbums);
}

export default appSaga;
