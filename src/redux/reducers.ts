import { initialState, PlayStatus, StoreState } from './store';
import {
    ActionType,
    NEXT_TRACK,
    PREVIOUS_TRACK,
    SET_ALL_ALBUMS,
    SET_CATEGORIES,
    SET_CURRENT_ALBUM_DETAIL,
    SET_CURRENT_TRACK,
    SET_CURRENT_TRACK_SLUG,
    SET_FEATURED_ALBUMS,
    SET_LOADING_STATE,
    SET_PLAY_LIST,
    SET_PLAY_STATUS,
    SET_SHOW_MODE,
    SET_TOP_ALBUMS,
    SET_TRACKS,
    SET_MUTED
} from './actions';

export const reducer = (state: StoreState = initialState, action: ActionType): StoreState => {
    switch (action.type) {
        case SET_SHOW_MODE:
            return Object.assign({}, state, { ...state, showMode: action.showMode });
        case SET_CURRENT_TRACK_SLUG: {
            if (state.playList.indexOf(action.trackSlug) === -1) {
                return Object.assign({}, state, {...state, currentTrackSlug: action.trackSlug, playList: [action.trackSlug]});
            }
            return Object.assign({}, state, {...state, currentTrackSlug: action.trackSlug});
        }
        case SET_PLAY_LIST:
            return Object.assign({}, state, { ...state, playList: action.playList, currentTrackSlug: action.playList[0] });
        case SET_PLAY_STATUS:
            return Object.assign({}, state, { ...state, playStatus: action.playStatus });
        case NEXT_TRACK: {
            const iCurrentPosition = state.playList.indexOf(state.currentTrackSlug);
            if (iCurrentPosition === state.playList.length - 1) {
                return state;
            }
            return Object.assign({}, state, { ...state, currentTrackSlug: state.playList[iCurrentPosition+1]});
        }
        case PREVIOUS_TRACK: {
            const iCurrentPosition = state.playList.indexOf(state.currentTrackSlug);
            if (iCurrentPosition === 0) {
                return state;
            }
            return Object.assign({}, state, { ...state, currentTrackSlug: state.playList[iCurrentPosition-1]});
        }
        case SET_ALL_ALBUMS: {
            return Object.assign({}, state, {...state, allAlbumList: action.albums});
        }
        case SET_FEATURED_ALBUMS: {
            return Object.assign({}, state, {...state, featuredAlbumList: action.albums});
        }
        case SET_TRACKS: {
            return Object.assign({}, state, {...state, tracks: action.tracks});
        }
        case SET_CURRENT_ALBUM_DETAIL: {
            return Object.assign({}, state, {...state, currentAlbumDetails: action.album});
        }
        case SET_CURRENT_TRACK: {
            return Object.assign({}, state, {...state, currentTrack: action.track, playStatus: PlayStatus.PLAYING});
        }
        case SET_TOP_ALBUMS: {
            return Object.assign({}, state, {...state, topAlbums: action.albums});
        }
        case SET_LOADING_STATE: {
            return Object.assign({}, state, {...state, loadingState: action.loadingState});
        }
        case SET_CATEGORIES: {
            return Object.assign({}, state, {...state, categories: action.categories});
        }
        case SET_MUTED: {
            return Object.assign({}, state, {...state, muted: action.muted});
        }
        default:
            return state;
    }
};
