import { PlayStatus, ShowMode } from './store';
import { Album, DetailAlbum, Track } from '../models';

export const SET_SHOW_MODE = 'SET_SHOW_MODE';
export const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK';
export const SET_PLAY_LIST = 'SET_PLAY_LIST';
export const SET_PLAY_STATUS = 'SET_PLAY_STATUS';
export const NEXT_TRACK = 'NEXT_TRACK';
export const PREVIOUS_TRACK = 'PREVIOUS_TRACK';
export const SET_ALL_ALBUMS = 'SET_ALL_ALBUMS';
export const ALL_ALBUMS_FETCH_FAILED = 'ALL_ALBUMS_FETCH_FAILED';
export const SET_FEATURED_ALBUMS = 'SET_FEATURED_ALBUMS';
export const FEATURED_ALBUMS_FETCH_FAILED = 'FEATURED_ALBUMS_FETCH_FAILED';
export const SET_TRACKS = 'SET_TRACKS';
export const TRACKS_FETCH_FAILED = 'TRACKS_FETCH_FAILED';
export const SET_CURRENT_ALBUM_DETAIL = 'SET_CURRENT_ALBUM_DETAIL';
export const ALBUM_DETAIL_FETCH_FAILED = 'ALBUM_DETAIL_FETCH_FAILED';

// saga actions
export const ALL_ALBUMS_REQUESTED = 'ALL_ALBUMS_REQUESTED';
export const FEATURED_ALBUMS_REQUESTED = 'FEATURED_ALBUMS_REQUESTED';
export const TRACKS_REQUESTED = 'TRACKS_REQUESTED';
export const ALBUM_DETAIL_REQUESTED = ' ALBUM_DETAIL_REQUEST';

type SET_SHOW_MODE = typeof SET_SHOW_MODE;
type SET_CURRENT_TRACK = typeof SET_CURRENT_TRACK;
type SET_PLAY_LIST = typeof SET_PLAY_LIST;
type SET_PLAY_STATUS = typeof SET_PLAY_STATUS;
type NEXT_TRACK = typeof NEXT_TRACK;
type PREVIOUS_TRACK = typeof PREVIOUS_TRACK;

type SET_ALL_ALBUMS = typeof SET_ALL_ALBUMS;
type ALL_ALBUMS_FETCH_FAILED = typeof ALL_ALBUMS_FETCH_FAILED;

type SET_FEATURED_ALBUMS = typeof SET_FEATURED_ALBUMS;
type FEATURED_ALBUMS_FETCH_FAILED = typeof FEATURED_ALBUMS_FETCH_FAILED;

type SET_TRACKS = typeof SET_TRACKS;
type TRACKS_FETCH_FAILED = typeof TRACKS_FETCH_FAILED;

type SET_CURRENT_ALBUM_DETAIL = typeof SET_CURRENT_ALBUM_DETAIL;
type ALBUM_DETAIL_FETCH_FAILED = typeof ALBUM_DETAIL_FETCH_FAILED;

type ALBUM_DETAIL_REQUESTED = typeof ALBUM_DETAIL_REQUESTED;

interface SetShowMode {
    type: SET_SHOW_MODE;
    showMode: string;
}

interface SetCurrentTrack {
    type: SET_CURRENT_TRACK;
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

// saga interfaces
// saga actions with parameters need interface for the action type and must be exported
export interface RequestAlbumDetail {
    type: ALBUM_DETAIL_REQUESTED;
    slug: string;
}

export type ActionType =
    SetShowMode |
    SetCurrentTrack |
    SetPlayList |
    SetPlayStatus |
    NextTrack |
    PreviousTrack |
    SetAllAlbums |
    SetFeaturedAlbums |
    SetTracks |
    SetCurrentAlbumDetail |
    RequestAlbumDetail;

export const setShowMode = (showMode: ShowMode) => ({ type: SET_SHOW_MODE, showMode: showMode });
export const setCurrentTrack = (track: string) => ({ type: SET_CURRENT_TRACK, trackSlug: track });
export const setPlayList = (playList: string[]) => ({ type: SET_PLAY_LIST, playList: playList});
export const setPlayStatus = (playStatus: PlayStatus) => ({ type: SET_PLAY_STATUS, playStatus: playStatus });
export const nextTrack = () => ({ type: NEXT_TRACK });
export const previousTrack = () => ({ type: PREVIOUS_TRACK });
export const requestAllAlbums = () => ({ type: ALL_ALBUMS_REQUESTED });
export const requestFeaturedAlbums = () => ({ type: FEATURED_ALBUMS_REQUESTED });
export const requestTracks = () => ({ type: TRACKS_REQUESTED });
export const requestAlbumDetail = (slug: string) => ({ type: ALBUM_DETAIL_REQUESTED, slug: slug });
export const setAllAlbums = (albums: Album[]) => ({ type: SET_ALL_ALBUMS, albums: albums });
export const setFeaturedAlbums = (albums: Album[]) => ({ type: SET_FEATURED_ALBUMS, albums: albums});
export const setTracks = (tracks: Track[]) => ({ type: SET_TRACKS, tracks: tracks});
export const setCurrentAlbumDetail = (album: DetailAlbum) => ({ type: SET_CURRENT_ALBUM_DETAIL, album: album});
