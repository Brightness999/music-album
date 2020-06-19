import { call, put, takeLatest } from 'redux-saga/effects';

import {
    apiDownloadAlbum,
    apiFetchAlbumDetail,
    apiFetchAllAlbums,
    apiFetchFeaturedAlbums,
    apiFetchGenreAlbums, apiFetchPickedAlbums,
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
    LOGIN_REQUESTED, PICKED_ALBUMS_REQUESTED, PICKED_TRACKS_REQUESTED,
    RequestAlbumDetail,
    RequestAllAlbums,
    RequestDownloadAlbum,
    RequestDownloadTrack,
    RequestGenreAlbums,
    RequestGenreTracks,
    RequestLogin, RequestPickedAlbums, RequestPickedTracks,
    RequestSearch,
    RequestTrack,
    RequestTracks, requestUserInfo,
    SEARCH_REQUESTED,
    SELECT_ALBUM_AS_PLAY_LIST,
    SelectAlbumAsPlaylist, SET_ALBUM_BANDCAMP,
    SET_ALBUM_TOP, SET_ALBUM_VINYL,
    SetAlbumTop,
    setAllAlbums,
    setCategories,
    setCurrentAlbumDetail,
    setCurrentPage,
    setCurrentTrack,
    setCurrentTrackSlug,
    setDownloadErrorMessage,
    setFeaturedAlbums,
    setHasDownloadError,
    setLoadingState,
    setLoggedIn,
    setLoginErrorMessage,
    setPageCount,
    setPlayList,
    setSearchModeValue,
    setTopAlbums,
    setTracks,
    setUserInfo,
    TOP_ALBUMS_REQUESTED,
    TRACK_REQUESTED,
    TRACKS_REQUESTED,
    USER_INFO_REQUESTED
} from './actions';
import {
    apiDownloadTrack,
    apiFetchGenreTracks, apiFetchPickedTracks,
    apiFetchSearch,
    apiFetchTrack,
    apiFetchTracks, apiSetAlbumBandcamp,
    apiSetAlbumTop, apiSetAlbumVinyl
} from '../api/TrackAPI';
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

function* fetchPickedAlbums(action: RequestPickedAlbums) {
    console.log('fetch picked albums');
    try {
        yield put(setLoadingState(LoadingState.LOADING));
        const [albums, albumCount] = yield call(apiFetchPickedAlbums, action.pickType, action.skip, action.limit, action.publisherSlug);
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
        const [tracks, trackCount] = yield call(apiFetchTracks, action.skip, action.limit, action.publisherSlug, action.title);
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

function* fetchPickedTracks(action: RequestPickedTracks) {
    try {
        yield put(setLoadingState(LoadingState.LOADING));
        const [tracks, trackCount] = yield call(apiFetchPickedTracks, action.pickType, action.skip, action.limit, action.publisherSlug, action.title);
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
    yield put(setCurrentTrackSlug(play_list[0]));
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
            yield put(requestUserInfo());
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

function* fetchSearch(action: RequestSearch) {
    try {
        yield put(setLoadingState(LoadingState.LOADING));
        const [tracks, trackCount, searchModeValue] = yield call(apiFetchSearch, action.skip, action.limit, action.keyword);
        yield put(setTracks(tracks));
        yield put(setPageCount(Math.ceil(trackCount / trackCountPerPage)));
        if (tracks.length === 0) {
            yield put(setCurrentPage(0));
        }
        yield put(setSearchModeValue(searchModeValue));
        yield put(setLoadingState(LoadingState.LOADED));
    } catch (e) {
        yield put(setTracks([]));
    }
}

function* setAlbumTop(action: SetAlbumTop) {
    try {
        yield put(setLoadingState(LoadingState.LOADING));
        const { result, album, message } = yield call(apiSetAlbumTop, action.albumId, action.onoff);
        if (result === 0) {
            yield put(setCurrentAlbumDetail(album));
        } else {
            console.log(message);
        }
    } catch (e) {
        console.log(e.message);
    } finally {
        yield put(setLoadingState(LoadingState.LOADED));
    }
}

function* setAlbumVinyl(action: SetAlbumTop) {
    try {
        yield put(setLoadingState(LoadingState.LOADING));
        const { result, album, message } = yield call(apiSetAlbumVinyl, action.albumId, action.onoff);
        if (result === 0) {
            yield put(setCurrentAlbumDetail(album));
        } else {
            console.log(message);
        }
    } catch (e) {
        console.log(e.message);
    } finally {
        yield put(setLoadingState(LoadingState.LOADED));
    }
}

function* setAlbumBandcamp(action: SetAlbumTop) {
    try {
        yield put(setLoadingState(LoadingState.LOADING));
        const { result, album, message } = yield call(apiSetAlbumBandcamp, action.albumId, action.onoff);
        if (result === 0) {
            yield put(setCurrentAlbumDetail(album));
        } else {
            console.log(message);
        }
    } catch (e) {
        console.log(e.message);
    } finally {
        yield put(setLoadingState(LoadingState.LOADED));
    }
}

function* appSaga() {
    yield takeLatest(ALL_ALBUMS_REQUESTED, fetchAllAlbums);
    yield takeLatest(PICKED_ALBUMS_REQUESTED, fetchPickedAlbums);
    yield takeLatest(FEATURED_ALBUMS_REQUESTED, fetchFeaturedAlbums);
    yield takeLatest(TRACKS_REQUESTED, fetchTracks);
    yield takeLatest(PICKED_TRACKS_REQUESTED, fetchPickedTracks);
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
    yield takeLatest(SEARCH_REQUESTED, fetchSearch);
    yield takeLatest(SET_ALBUM_TOP, setAlbumTop);
    yield takeLatest(SET_ALBUM_VINYL, setAlbumVinyl);
    yield takeLatest(SET_ALBUM_BANDCAMP, setAlbumBandcamp);
}

export default appSaga;
