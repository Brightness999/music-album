import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { reducer } from './reducers';

export enum PlayStatus {
    PLAYING = 'PLAYING',
    STOPPED = 'STOPPED',
    PAUSED = 'PAUSED'
}

export enum ShowMode {
    GRID = 'GRID',
    LIST = 'LIST'
}

export interface StoreState {
  showMode: ShowMode;
  currentTrack: string;
  playList: string[];
  playStatus: PlayStatus;
}

export const initialState: StoreState = {
    showMode: ShowMode.GRID,
    currentTrack: '',
    playList: [],
    playStatus: PlayStatus.STOPPED
};

// Store
export const store = createStore(
  reducer,
  devToolsEnhancer({}),
);
