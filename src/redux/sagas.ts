import { call, put, takeLatest } from 'redux-saga/effects'
import {
    apiDownloadAlbum,
    apiFetchAlbumDetail,
    apiFetchAllAlbums,
    apiFetchFeaturedAlbums,
    apiFetchGenreAlbums,
    apiFetchTopAlbums
} from '../api/AlbumAPI';
import {
    ALBUM_DETAIL_REQUESTED,
    ALL_ALBUMS_REQUESTED,
    CATEGORIES_REQUESTED,
    DOWNLOAD_ALBUM_REQUESTED,
    DOWNLOAD_TRACK_REQUESTED,
    FEATURED_ALBUMS_REQUESTED,
    GENRE_ALBUMS_REQUESTED,
    GENRE_TRACKS_REQUESTED,
    LOGIN_REQUESTED,
    RequestAlbumDetail,
    RequestAllAlbums,
    RequestDownloadAlbum,
    RequestDownloadTrack,
    RequestGenreAlbums,
    RequestGenreTracks,
    RequestLogin,
    RequestTrack,
    RequestTracks,
    SELECT_ALBUM_AS_PLAY_LIST,
    SelectAlbumAsPlaylist,
    setAllAlbums,
    setCategories,
    setCurrentAlbumDetail,
    setCurrentPage,
    setCurrentTrack,
    setDownloadErrorMessage,
    setFeaturedAlbums,
    setHasDownloadError,
    setLoadingState,
    setLoggedIn,
    setLoginErrorMessage,
    setPageCount,
    setPlayList,
    setTopAlbums,
    setTracks,
    setUserInfo,
    TOP_ALBUMS_REQUESTED,
    TRACK_REQUESTED,
    TRACKS_REQUESTED,
    USER_INFO_REQUESTED
} from './actions';
import { apiDownloadTrack, apiFetchGenreTracks, apiFetchTrack, apiFetchTracks } from '../api/TrackAPI';
import { Track } from '../models';
import { LoadingState } from './store';
import { apiFetchCategories } from '../api/CategoriAPI';
import { albumCountPerPage, trackCountPerPage } from '../consts';
import { apiFetchUserInfo, apiLogin } from '../api/AuthAPI';

function* fetchAllAlbums(action: RequestAllAlbums) {
    try {
        yield put(setLoadingState(LoadingState.LOADING));
        const [albums, albumCount] = yield call(apiFetchAllAlbums, action.skip, action.limit, action.publisherSlug);
        yield put(setAllAlbums(albums));
        yield put(setPageCount(Math.ceil(albumCount / albumCountPerPage)));
        if (albums.length === 0) {
            yield put(setCurrentPage(0));
        }
        yield put(setLoadingState(LoadingState.LOADED));

    } catch (e) {
        yield put(setAllAlbums([]));
    }
}

function* fetchGenreAlbums(action: RequestGenreAlbums) {
    try {
        yield put(setLoadingState(LoadingState.LOADING));
        const [albums, albumCount] = yield call(apiFetchGenreAlbums, action.skip, action.limit, action.categorySlug);
        yield put(setAllAlbums(albums));
        yield put(setPageCount(Math.ceil(albumCount / albumCountPerPage)));
        if (albums.length === 0) {
            yield put(setCurrentPage(0));
        }
        yield put(setLoadingState(LoadingState.LOADED));

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
        yield put(setLoadingState(LoadingState.LOADING));
        const albums = yield call(apiFetchFeaturedAlbums);
        yield put(setFeaturedAlbums(albums));
        yield put(setLoadingState(LoadingState.LOADED));
    } catch (e) {
        yield put(setFeaturedAlbums([]));
    }
}

function* fetchTracks(action: RequestTracks) {
    try {
        yield put(setLoadingState(LoadingState.LOADING));
        const [tracks, trackCount] = yield call(apiFetchTracks, action.skip, action.limit, action.publisherSlug);
        yield put(setTracks(tracks));
        yield put(setPageCount(Math.ceil(trackCount / trackCountPerPage)));
        if (tracks.length === 0) {
            yield put(setCurrentPage(0));
        }
        yield put(setLoadingState(LoadingState.LOADED));
    } catch (e) {
        yield put(setTracks([]));
    }
}

function* fetchGenreTracks(action: RequestGenreTracks) {
    try {
        yield put(setLoadingState(LoadingState.LOADING));
        const [tracks, trackCount] = yield call(apiFetchGenreTracks, action.skip, action.limit, action.categorySlug);
        yield put(setTracks(tracks));
        yield put(setPageCount(Math.ceil(trackCount / trackCountPerPage)));
        if (tracks.length === 0) {
            yield put(setCurrentPage(0));
        }
        yield put(setLoadingState(LoadingState.LOADED));

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

function* downloadTrack(action: RequestDownloadTrack) {
    try {
        const [result, message] = yield call(apiDownloadTrack, action.trackSlug, action.fileType, 'check');
        if (result !== 0) {
            yield put(setDownloadErrorMessage(message));
            yield put(setHasDownloadError(true));
        } else {
            yield call(apiDownloadTrack, action.trackSlug, action.fileType, 'download');
        }
    } catch (e) { }
}

function* downloadAlbum(action: RequestDownloadAlbum) {
    try {
        const [result, message] = yield call(apiDownloadAlbum, action.albumSlug, action.fileType, 'check');
        if (result !== 0) {
            yield put(setDownloadErrorMessage(message));
            yield put(setHasDownloadError(true));
        } else {
            yield call(apiDownloadAlbum, action.albumSlug, action.fileType, 'download');
        }
    } catch (e) { }
}

function* tryLogin(action: RequestLogin) {
    try {
        const [result, token] = yield call(apiLogin, action.userId, action.password);
        if (result === 0) {
            // success
            localStorage.setItem('token', token);
            yield put(setLoggedIn(true));
        } else {
            yield put(setLoginErrorMessage('Please provide valid credential.'));
        }
    } catch (e) { }
}

function* fetchUserInfo() {
    try {
        const [result, userInfo] = yield call(apiFetchUserInfo);
        if (result === 0) {
            yield put(setUserInfo(userInfo));
        }
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
    yield takeLatest(GENRE_ALBUMS_REQUESTED, fetchGenreAlbums);
    yield takeLatest(LOGIN_REQUESTED, tryLogin);
    yield takeLatest(DOWNLOAD_TRACK_REQUESTED, downloadTrack);
    yield takeLatest(DOWNLOAD_ALBUM_REQUESTED, downloadAlbum);
    yield takeLatest(USER_INFO_REQUESTED, fetchUserInfo);
}

export default appSaga;
