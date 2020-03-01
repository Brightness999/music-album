import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";

export interface StoreState {
  showMode: string;
}

export const SHOW_MODE = {
    GRID: 'grid',
    LIST: 'list'
}

export const initialState: StoreState = {
    showMode: SHOW_MODE.GRID
};

// Actions
export const SET_SHOW_MODE = "SET_SHOW_MODE";
export type SET_SHOW_MODE = typeof SET_SHOW_MODE;
export interface SetShowMode {
  type: SET_SHOW_MODE;
  showMode: string;
}
export const setShowMode = (showMode: string) => ({ type: SET_SHOW_MODE, showMode: showMode });

// Selectors
export const selectShowMode = (state: StoreState) => state.showMode;

// Reducer
export const reducer = (state: StoreState = initialState, action: SetShowMode): StoreState => {
  switch (action.type) {
    case SET_SHOW_MODE:
      return Object.assign({}, state, { showMode: action.showMode });
    default:
      return state;
  }
};

// Store
export const store = createStore(
  reducer,
  devToolsEnhancer({}),
);
