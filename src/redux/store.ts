import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { reducer } from './reducers';
import appSaga from './sagas';
import { Album, DetailAlbum, Track } from '../models';

export enum PlayStatus {
    PLAYING = 'PLAYING',
    STOPPED = 'STOPPED',
    PAUSED = 'PAUSED'
}

export enum ShowMode {
    GRID = 'GRID',
    LIST = 'LIST'
}

export const initialState: StoreState = {
    showMode: ShowMode.GRID,
    currentTrack: '',
    playList: [],
    playStatus: PlayStatus.STOPPED,
    allAlbumList: [],
    featuredAlbumList: [],
    tracks: []
};

export interface StoreState {
    showMode: ShowMode;
    currentTrack: string;
    playList: string[];
    playStatus: PlayStatus;
    allAlbumList: Album[];
    featuredAlbumList: Album[];
    tracks: Track[];
    currentAlbumDetails?: DetailAlbum;
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
