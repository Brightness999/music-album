import { PlayStatus, ShowMode } from './store';

export const SET_SHOW_MODE = 'SET_SHOW_MODE';
export const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK';
export const SET_PLAY_LIST = 'SET_PLAY_LIST';
export const SET_PLAY_STATUS = 'SET_PLAY_STATUS';
export const NEXT_TRACK = 'NEXT_TRACK';
export const PREVIOUS_TRACK = 'PREVIOUS_TRACK';

type SET_SHOW_MODE = typeof SET_SHOW_MODE;
type SET_CURRENT_TRACK = typeof SET_CURRENT_TRACK;
type SET_PLAY_LIST = typeof SET_PLAY_LIST;
type SET_PLAY_STATUS = typeof SET_PLAY_STATUS;
type NEXT_TRACK = typeof NEXT_TRACK;
type PREVIOUS_TRACK = typeof PREVIOUS_TRACK;

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

export type ActionType = SetShowMode | SetCurrentTrack | SetPlayList | SetPlayStatus | NextTrack | PreviousTrack;

export const setShowMode = (showMode: ShowMode) => ({ type: SET_SHOW_MODE, showMode: showMode });
export const setCurrentTrack = (track: string) => ({ type: SET_CURRENT_TRACK, trackSlug: track });
export const setPlayList = (playList: string[]) => ({ type: SET_PLAY_LIST, playList: playList});
export const setPlayStatus = (playStatus: PlayStatus) => ({ type: SET_PLAY_STATUS, playStatus: playStatus });
export const nextTrack = () => ({ type: NEXT_TRACK });
export const previousTrack = () => ({ type: PREVIOUS_TRACK });
