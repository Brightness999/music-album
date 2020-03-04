import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { reducer } from './reducers';
import appSaga from './sagas';
import { Album, Category, DetailAlbum, Track } from '../models';

export enum PlayStatus {
    PLAYING = 'PLAYING',
    STOPPED = 'STOPPED',
    PAUSED = 'PAUSED'
}

export enum ShowMode {
    GRID = 'GRID',
    LIST = 'LIST'
}

export enum LoadingState {
    LOADING = 'LOADING',
    LOADED = 'LOADED'
}

export const initialState: StoreState = {
    showMode: ShowMode.GRID,
    currentTrackSlug: '',
    playList: [],
    playStatus: PlayStatus.STOPPED,
    allAlbumList: [],
    featuredAlbumList: [],
    tracks: [],
    topAlbums: [],
    loadingState: LoadingState.LOADED,
    categories: [],
    muted: false
};

export interface StoreState {
    showMode: ShowMode;
    playList: string[];
    currentTrackSlug: string;
    playStatus: PlayStatus;
    allAlbumList: Album[];
    featuredAlbumList: Album[];
    tracks: Track[];
    currentAlbumDetails?: DetailAlbum;
    currentTrack?: Track;
    topAlbums: Album[];
    loadingState: LoadingState;
    categories: Category[];
    muted: boolean;
}

// saga middleware
const sagaMiddleware = createSagaMiddleware();

// Store
export const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
);

sagaMiddleware.run(appSaga);
