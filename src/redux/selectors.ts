import { StoreState } from './store';

export const selectShowMode = (state: StoreState) => state.showMode;
export const selectCurrentTrack = (state: StoreState) => state.currentTrack;
export const selectPlayList = (state: StoreState) => state.playList;
export const selectPlayStatus = (state: StoreState) => state.playStatus;
