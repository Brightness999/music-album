import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";

export interface StoreState {
  showMode: string;
  currentTrack: string;
  playList: string[];
  playStatus: 'PLAYING' | 'STOPPED' | 'PAUSED';
}

export const SHOW_MODE = {
    GRID: 'grid',
    LIST: 'list'
};

export const PLAY_STATUS = {
    PLAYING: 'PLAYING',
    STOPPED: 'STOPPED',
    PAUSED: 'PAUSED'
};

export const initialState: StoreState = {
    showMode: SHOW_MODE.GRID,
    currentTrack: '',
    playList: [],
    playStatus: 'STOPPED'
};

type PlayStatus = typeof initialState.playStatus;


// Actions
export const SET_SHOW_MODE = "SET_SHOW_MODE";
export const SET_CURRENT_TRACK = "SET_CURRENT_TRACK";
export const SET_PLAY_LIST = "SET_PLAY_LIST";
export const SET_PLAY_STATUS = "SET_PLAY_STATUS";
export const NEXT_TRACK = "NEXT_TRACK";
export const PREVIOUS_TRACK = "PREVIOUS_TRACK";

export type SET_SHOW_MODE = typeof SET_SHOW_MODE;
export type SET_CURRENT_TRACK = typeof SET_CURRENT_TRACK;
export type SET_PLAY_LIST = typeof SET_PLAY_LIST;
export type SET_PLAY_STATUS = typeof SET_PLAY_STATUS;
export type NEXT_TRACK = typeof NEXT_TRACK;
export type PREVIOUS_TRACK = typeof PREVIOUS_TRACK;

export interface SetShowMode {
  type: SET_SHOW_MODE;
  showMode: string;
}

export interface SetCurrentTrack {
    type: SET_CURRENT_TRACK;
    trackSlug: string;
}

export interface SetPlayList {
    type: SET_PLAY_LIST;
    playList: string[];
}

export interface SetPlayStatus {
    type: SET_PLAY_STATUS;
    playStatus: PlayStatus
}

export interface NextTrack {
    type: NEXT_TRACK;
}

export interface PreviousTrack {
    type: PREVIOUS_TRACK;
}

export type ActionType = SetShowMode | SetCurrentTrack | SetPlayList | SetPlayStatus | NextTrack | PreviousTrack;

export const setShowMode = (showMode: string) => ({ type: SET_SHOW_MODE, showMode: showMode });
export const setCurrentTrack = (track: string) => ({ type: SET_CURRENT_TRACK, trackSlug: track });
export const setPlayList = (playList: string[]) => ({ type: SET_PLAY_LIST, playList: playList});
export const setPlayStatus = (playStatus: PlayStatus) => ({ type: SET_PLAY_STATUS, playStatus: playStatus });
export const nextTrack = () => ({ type: NEXT_TRACK });
export const previousTrack = () => ({ type: PREVIOUS_TRACK });

// Selectors
export const selectShowMode = (state: StoreState) => state.showMode;
export const selectCurrentTrack = (state: StoreState) => state.currentTrack;
export const selectPlayList = (state: StoreState) => state.playList;
export const selectPlayStatus = (state: StoreState) => state.playStatus;

// Reducer
export const reducer = (state: StoreState = initialState, action: ActionType): StoreState => {
  switch (action.type) {
    case SET_SHOW_MODE:
      return Object.assign({}, state, { ...state, showMode: action.showMode });
  case SET_CURRENT_TRACK: {
      if (state.playList.indexOf(state.currentTrack) === -1) {
          return Object.assign({}, state, {...state, currentTrack: action.trackSlug, playList: [action.trackSlug]});
      }
      return Object.assign({}, state, {...state, currentTrack: action.trackSlug});
  }
  case SET_PLAY_LIST:
      return Object.assign({}, state, { ...state, playList: action.playList, currentTrack: action.playList[0] });
  case SET_PLAY_STATUS:
      return Object.assign({}, state, { ...state, playStatus: action.playStatus });
  case NEXT_TRACK: {
      const iCurrentPosition = state.playList.indexOf(state.currentTrack);
      if (iCurrentPosition === state.playList.length - 1) {
          return state;
      }
      return Object.assign({}, state, { ...state, currentTrack: state.playList[iCurrentPosition+1]});
  }
      case PREVIOUS_TRACK: {
          const iCurrentPosition = state.playList.indexOf(state.currentTrack);
          if (iCurrentPosition === 0) {
              return state;
          }
          return Object.assign({}, state, { ...state, currentTrack: state.playList[iCurrentPosition-1]});
      }

    default:
      return state;
  }
};

// Store
export const store = createStore(
  reducer,
  devToolsEnhancer({}),
);
