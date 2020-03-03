import { StoreState } from './store';

export const selectShowMode = (state: StoreState) => state.showMode;
export const selectCurrentTrackSlug = (state: StoreState) => state.currentTrackSlug;
export const selectCurrentTrack = (state: StoreState) => state.currentTrack;
export const selectPlayList = (state: StoreState) => state.playList;
export const selectPlayStatus = (state: StoreState) => state.playStatus;
export const selectAllAlbumList = (state: StoreState) => state.allAlbumList;
export const selectTracks = (state: StoreState) => state.tracks;
export const selectFeaturedAlbumList = (state: StoreState) => state.featuredAlbumList;
export const selectCurrentAlbumDetail = (state: StoreState) => state.currentAlbumDetails;
export const selectTopAlbums = (state: StoreState) => state.topAlbums;
export const selectLoadingState = (state: StoreState) => state.loadingState;
