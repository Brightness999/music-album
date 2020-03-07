import { LoadingState, PlayStatus, ShowMode } from './store';
import { Album, Category, DetailAlbum, Track } from '../models';
import { MusicFileType } from '../types';

export const SET_SHOW_MODE = 'SET_SHOW_MODE';
export const SET_PLAY_LIST = 'SET_PLAY_LIST';
export const SET_CURRENT_TRACK_SLUG = 'SET_CURRENT_TRACK_SLUG';
export const SET_PLAY_STATUS = 'SET_PLAY_STATUS';
export const NEXT_TRACK = 'NEXT_TRACK';
export const PREVIOUS_TRACK = 'PREVIOUS_TRACK';
export const SET_ALL_ALBUMS = 'SET_ALL_ALBUMS';
export const SET_FEATURED_ALBUMS = 'SET_FEATURED_ALBUMS';
export const SET_TRACKS = 'SET_TRACKS';
export const SET_CURRENT_ALBUM_DETAIL = 'SET_CURRENT_ALBUM_DETAIL';
export const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK';
export const SELECT_ALBUM_AS_PLAY_LIST = 'SELECT_ALBUM_AS_PLAY_LIST';
export const SET_TOP_ALBUMS = 'SET_TOP_ALBUMS';
export const SET_LOADING_STATE = 'SET_LOADING_STATE';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_MUTED = 'SET_MUTED';
export const SET_PAGE_COUNT = 'SET_PAGE_COUNT';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const SET_LOGIN_ERROR_MESSAGE = 'SET_LOGIN_ERROR_MESSAGE';
export const SET_DOWNLOAD_ERROR_MESSAGE = 'SET_DOWNLOAD_ERROR_MESSAGE';
export const SET_HAS_DOWNLOAD_ERROR = 'SET_HAS_DOWNOAD_ERROR';
// saga actions
export const ALL_ALBUMS_REQUESTED = 'ALL_ALBUMS_REQUESTED';
export const GENRE_ALBUMS_REQUESTED = 'GENRE_ALBUMS_REQUESTED';
export const FEATURED_ALBUMS_REQUESTED = 'FEATURED_ALBUMS_REQUESTED';
export const TRACKS_REQUESTED = 'TRACKS_REQUESTED';
export const ALBUM_DETAIL_REQUESTED = ' ALBUM_DETAIL_REQUEST';
export const TRACK_REQUESTED = 'TRACK_REQUESTED';
export const TOP_ALBUMS_REQUESTED = 'TOP_ALBUMS_REQUESTED';
export const GENRE_TRACKS_REQUESTED = 'GENRE_TRACKS_REQUESTED';
export const CATEGORIES_REQUESTED = 'CATEGORIES_REQUESTED';
export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const DOWNLOAD_TRACK_REQUESTED = 'DOWNLOAD_TRACK_REQUESTED';

type SET_SHOW_MODE = typeof SET_SHOW_MODE;
type SET_PLAY_LIST = typeof SET_PLAY_LIST;
type SET_PLAY_STATUS = typeof SET_PLAY_STATUS;
type NEXT_TRACK = typeof NEXT_TRACK;
type PREVIOUS_TRACK = typeof PREVIOUS_TRACK;
type SET_CURRENT_TRACK_SLUG = typeof SET_CURRENT_TRACK_SLUG;
type SET_ALL_ALBUMS = typeof SET_ALL_ALBUMS;
type SET_FEATURED_ALBUMS = typeof SET_FEATURED_ALBUMS;
type SET_TRACKS = typeof SET_TRACKS;
type SET_CURRENT_TRACK = typeof SET_CURRENT_TRACK;
type SET_CURRENT_ALBUM_DETAIL = typeof SET_CURRENT_ALBUM_DETAIL;
type SET_TOP_ALBUMS = typeof SET_TOP_ALBUMS;
type ALBUM_DETAIL_REQUESTED = typeof ALBUM_DETAIL_REQUESTED;
type GENRE_ALBUMS_REQUESTED = typeof GENRE_ALBUMS_REQUESTED;
type ALL_ALBUMS_REQUESTED = typeof ALL_ALBUMS_REQUESTED;
type TRACK_REQUESTED = typeof TRACK_REQUESTED;
type TRACKS_REQUESTED = typeof TRACKS_REQUESTED;
type SELECT_ALBUM_AS_PLAY_LIST = typeof SELECT_ALBUM_AS_PLAY_LIST;
type SET_LOADING_STATE = typeof SET_LOADING_STATE;
type GENRE_TRACKS_REQUESTED = typeof GENRE_TRACKS_REQUESTED;
type SET_CATEGORIES = typeof SET_CATEGORIES;
type SET_MUTED = typeof SET_MUTED;
type SET_CURRENT_PAGE = typeof SET_CURRENT_PAGE;
type SET_PAGE_COUNT = typeof SET_PAGE_COUNT;
type SET_LOGGED_IN = typeof SET_LOGGED_IN;
type LOGIN_REQUESTED = typeof LOGIN_REQUESTED;
type SET_LOGIN_ERROR_MESSAGE = typeof SET_LOGIN_ERROR_MESSAGE;
type DOWNLOAD_TRACK_REQUESTED = typeof DOWNLOAD_TRACK_REQUESTED;
type SET_HAS_DOWNLOAD_ERROR = typeof SET_HAS_DOWNLOAD_ERROR;
type SET_DOWNLOAD_ERROR_MESSAGE = typeof SET_DOWNLOAD_ERROR_MESSAGE;

interface SetShowMode {
    type: SET_SHOW_MODE;
    showMode: string;
}

interface SetCurrentTrackSlug {
    type: SET_CURRENT_TRACK_SLUG;
    trackSlug: string;
}

interface SetPlayList {
    type: SET_PLAY_LIST;
    playList: string[];
}

interface SetPlayStatus {
    type: SET_PLAY_STATUS;
    playStatus: PlayStatus;
}

interface NextTrack {
    type: NEXT_TRACK;
}

interface PreviousTrack {
    type: PREVIOUS_TRACK;
}

interface SetAllAlbums {
    type: SET_ALL_ALBUMS;
    albums: Album[];
}

interface SetFeaturedAlbums {
    type: SET_FEATURED_ALBUMS;
    albums: Album[];
}

interface SetTracks {
    type: SET_TRACKS;
    tracks: Track[];
}

interface SetCurrentAlbumDetail {
    type: SET_CURRENT_ALBUM_DETAIL;
    album: DetailAlbum;
}

interface SetCurrentTrack {
    type: SET_CURRENT_TRACK;
    track: Track;
}

interface SetTopAlbums {
    type: SET_TOP_ALBUMS;
    albums: Album[];
}

interface SetLoadingState {
    type: SET_LOADING_STATE;
    loadingState: LoadingState;
}

interface SetCategories {
    type: SET_CATEGORIES;
    categories: Category[];
}

interface SetMuted {
    type: SET_MUTED;
    muted: boolean;
}

interface SetPageCount {
    type: SET_PAGE_COUNT;
    pageCount: number;
}

interface SetCurrentPage {
    type: SET_CURRENT_PAGE;
    currentPage: number;
}

interface SetLoggedIn {
    type: SET_LOGGED_IN;
    loggedIn: boolean;
}

interface SetLoginErrorMessage {
    type: SET_LOGIN_ERROR_MESSAGE;
    loginErrorMessage: string;
}

interface SetHasDownloadError {
    type: SET_HAS_DOWNLOAD_ERROR;
    hasDownloadError: boolean;
}

interface SetDownloadErrorMessage {
    type: SET_DOWNLOAD_ERROR_MESSAGE;
    downloadErrorMessage: string;
}

// saga interfaces
// saga actions with parameters need interface for the action type and must be exported
export interface RequestAlbumDetail {
    type: ALBUM_DETAIL_REQUESTED;
    slug: string;
}

export interface RequestAllAlbums {
    type: ALL_ALBUMS_REQUESTED;
    skip: number;
    limit: number;
    publisherSlug: string;
}

export interface RequestGenreAlbums {
    type: GENRE_ALBUMS_REQUESTED;
    skip: number;
    limit: number;
    categorySlug: string;
}

export interface RequestTracks {
    type: TRACKS_REQUESTED;
    skip: number;
    limit: number;
    publisherSlug: string;
}

export interface RequestTrack {
    type: TRACK_REQUESTED;
    slug: string;
}

export interface SelectAlbumAsPlaylist {
    type: SELECT_ALBUM_AS_PLAY_LIST;
    slug: string;
}

export interface RequestGenreTracks {
    type: GENRE_TRACKS_REQUESTED;
    categorySlug: string;
    skip: number;
    limit: number;
}

export interface RequestLogin {
    type: LOGIN_REQUESTED;
    userId: string;
    password: string;
}

export interface RequestDownloadTrack {
    type: DOWNLOAD_TRACK_REQUESTED;
    trackSlug: string;
    fileType: MusicFileType;
}

export type ActionType =
    SetShowMode |
    SetCurrentTrackSlug |
    SetPlayList |
    SetPlayStatus |
    NextTrack |
    PreviousTrack |
    SetAllAlbums |
    SetFeaturedAlbums |
    SetTracks |
    SetCurrentAlbumDetail |
    RequestAlbumDetail |
    SetCurrentTrack |
    RequestTrack |
    SelectAlbumAsPlaylist |
    SetTopAlbums |
    SetLoadingState |
    SetCategories |
    SetMuted |
    SetPageCount |
    SetCurrentPage |
    RequestGenreAlbums |
    SetLoggedIn |
    RequestLogin |
    SetLoginErrorMessage |
    RequestDownloadTrack |
    SetHasDownloadError |
    SetDownloadErrorMessage;

export const setShowMode = (showMode: ShowMode) => ({ type: SET_SHOW_MODE, showMode: showMode });
export const setCurrentTrackSlug = (track: string) => ({ type: SET_CURRENT_TRACK_SLUG, trackSlug: track });
export const setPlayList = (playList: string[]) => ({ type: SET_PLAY_LIST, playList: playList});
export const setPlayStatus = (playStatus: PlayStatus) => ({ type: SET_PLAY_STATUS, playStatus: playStatus });
export const nextTrack = () => ({ type: NEXT_TRACK });
export const previousTrack = () => ({ type: PREVIOUS_TRACK });
export const requestAllAlbums = (skip: number, limit: number, publisherSlug: string) => ({ type: ALL_ALBUMS_REQUESTED, skip: skip, limit: limit, publisherSlug: publisherSlug });
export const requestGenreAlbums = (skip: number, limit: number, category: string) => ({ type: GENRE_ALBUMS_REQUESTED, skip: skip, limit: limit, categorySlug: category });
export const requestTopAlbums = () => ({ type: TOP_ALBUMS_REQUESTED });
export const requestFeaturedAlbums = () => ({ type: FEATURED_ALBUMS_REQUESTED });
export const requestTracks = (skip: number, limit: number, publisherSlug: string) => ({ type: TRACKS_REQUESTED, skip: skip, limit: limit, publisherSlug: publisherSlug });
export const requestGenreTracks = (categorySlug: string, skip: number, limit: number) => ({ type: GENRE_TRACKS_REQUESTED, categorySlug: categorySlug, skip: skip, limit: limit});
export const requestTrack = (slug: string) => ({ type: TRACK_REQUESTED, slug: slug });
export const requestAlbumDetail = (slug: string) => ({ type: ALBUM_DETAIL_REQUESTED, slug: slug });
export const setAllAlbums = (albums: Album[]) => ({ type: SET_ALL_ALBUMS, albums: albums });
export const setFeaturedAlbums = (albums: Album[]) => ({ type: SET_FEATURED_ALBUMS, albums: albums });
export const setTracks = (tracks: Track[]) => ({ type: SET_TRACKS, tracks: tracks});
export const setCurrentAlbumDetail = (album: DetailAlbum) => ({ type: SET_CURRENT_ALBUM_DETAIL, album: album });
export const setCurrentTrack = (track: Track) => ({ type: SET_CURRENT_TRACK, track: track });
export const selectAlbumAsPlaylist = (slug: string) => ({ type: SELECT_ALBUM_AS_PLAY_LIST, slug: slug });
export const setTopAlbums = (albums: Album[]) => ({ type: SET_TOP_ALBUMS, albums: albums });
export const setLoadingState = (loadingState: LoadingState) => ({ type: SET_LOADING_STATE, loadingState: loadingState });
export const setCategories = (categories: Category[]) => ({ type: SET_CATEGORIES, categories: categories });
export const requestCategories = () => ({ type: CATEGORIES_REQUESTED });
export const setMuted = (muted: boolean) => ({ type: SET_MUTED, muted: muted });
export const setCurrentPage = (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage: currentPage });
export const setPageCount = (pageCount: number) => ({ type: SET_PAGE_COUNT, pageCount: pageCount });
export const setLoggedIn  = (loggedIn: boolean) => ({ type: SET_LOGGED_IN, loggedIn: loggedIn});
export const requestLogin = (userId: string, password: string) => ({ type: LOGIN_REQUESTED, userId: userId, password: password});
export const setLoginErrorMessage = (loginErrorMessage: string) => ({ type: SET_LOGIN_ERROR_MESSAGE, loginErrorMessage: loginErrorMessage});
export const requestDownloadTrack = (trackSlug: string, fileType: MusicFileType) => ({ type: DOWNLOAD_TRACK_REQUESTED, trackSlug: trackSlug, fileType: fileType});
export const setHasDownloadError = (hasDownloadError: boolean) => ({ type: SET_HAS_DOWNLOAD_ERROR, hasDownloadError: hasDownloadError});
export const setDownloadErrorMessage = (downloadErrorMessage: string) => ({ type: SET_DOWNLOAD_ERROR_MESSAGE, downloadErrorMessage: downloadErrorMessage});
