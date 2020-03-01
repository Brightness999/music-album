import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";

export interface StoreState {
  showMode: string;
  currentTrack: string;
}

export const SHOW_MODE = {
    GRID: 'grid',
    LIST: 'list'
}

export const initialState: StoreState = {
    showMode: SHOW_MODE.GRID,
    currentTrack: ''
};

// Actions
export const SET_SHOW_MODE = "SET_SHOW_MODE";
export const SET_CURRENT_TRACK = "SET_CURRENT_TRACK";

export type SET_SHOW_MODE = typeof SET_SHOW_MODE;
export type SET_CURRENT_TRACK = typeof SET_CURRENT_TRACK;

export interface SetShowMode {
  type: SET_SHOW_MODE;
  showMode: string;
}

export interface SetCurrentTrack {
    type: SET_CURRENT_TRACK;
    track_slug: string;
}

export type ActionType = SetShowMode | SetCurrentTrack;

export const setShowMode = (showMode: string) => ({ type: SET_SHOW_MODE, showMode: showMode });
export const setCurrentTrack = (track: string) => ({ type: SET_CURRENT_TRACK, track_slug: track });

// Selectors
export const selectShowMode = (state: StoreState) => state.showMode;
export const selectCurrentTrack = (state: StoreState) => state.currentTrack;

// Reducer
export const reducer = (state: StoreState = initialState, action: ActionType): StoreState => {
  switch (action.type) {
    case SET_SHOW_MODE:
      return Object.assign({}, state, { ...state, showMode: action.showMode });
  case SET_CURRENT_TRACK:
      return Object.assign({}, state, { ...state, currentTrack: action.track_slug });
    default:
      return state;
  }
};

// Store
export const store = createStore(
  reducer,
  devToolsEnhancer({}),
);
