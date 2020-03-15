import {initialState, PlayStatus, StoreState} from './store';
import {
    ActionType,
    NEXT_TRACK,
    PREVIOUS_TRACK,
    SET_ALL_ALBUMS,
    SET_CATEGORIES,
    SET_CURRENT_ALBUM_DETAIL,
    SET_CURRENT_PAGE,
    SET_CURRENT_TRACK,
    SET_CURRENT_TRACK_SLUG,
    SET_DOWNLOAD_ERROR_MESSAGE,
    SET_FEATURED_ALBUMS,
    SET_HAS_DOWNLOAD_ERROR,
    SET_LOADING_STATE,
    SET_LOGGED_IN,
    SET_LOGIN_ERROR_MESSAGE,
    SET_MUTED,
    SET_PAGE_COUNT,
    SET_PLAY_LIST,
    SET_PLAY_STATUS,
    SET_PREMIUM,
    SET_SEARCH_MODE_VALUE,
    SET_SHOW_MODE,
    SET_TOP_ALBUMS,
    SET_TRACKS,
    SET_USER_INFO,
    SET_WIDE_SCREEN
} from './actions';

export const reducer = (state: StoreState = initialState, action: ActionType): StoreState => {
    switch (action.type) {
        case SET_SHOW_MODE:
            return Object.assign({}, state, { ...state, showMode: action.showMode, currentPage: 0 });
        case SET_CURRENT_TRACK_SLUG: {
            if (state.playList.indexOf(action.trackSlug) === -1) {
                return Object.assign({}, state, {...state, currentTrackSlug: action.trackSlug, playList: [action.trackSlug]});
            }
            return Object.assign({}, state, {...state, currentTrackSlug: action.trackSlug});
        }
        case SET_PLAY_LIST:
            return Object.assign({}, state, { ...state, playList: action.playList});
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
        case SET_PAGE_COUNT: {
            return Object.assign({}, state, {...state, pageCount: action.pageCount});
        }
        case SET_CURRENT_PAGE: {
            return Object.assign({}, state, {...state, currentPage: action.currentPage});
        }
        case SET_LOGGED_IN: {
            return Object.assign({}, state, {...state, loggedIn: action.loggedIn});
        }
        case SET_LOGIN_ERROR_MESSAGE: {
            return Object.assign({}, state, {...state, loginErrorMessage: action.loginErrorMessage});
        }
        case SET_DOWNLOAD_ERROR_MESSAGE: {
            return Object.assign({}, state, {...state, downloadErrorMessage: action.downloadErrorMessage});
        }
        case SET_HAS_DOWNLOAD_ERROR: {
            return Object.assign({}, state, {...state, hasDownloadError: action.hasDownloadError});
        }
        case SET_USER_INFO: {
            return Object.assign({}, state, {...state, userInfo: action.userInfo});
        }
        case SET_WIDE_SCREEN: {
            return Object.assign({}, state, {...state, wideScreen: action.wideScreen});
        }
        case SET_SEARCH_MODE_VALUE: {
            return Object.assign({}, state, {...state, searchModeValue: action.searchModeValue});
        }
        case SET_PREMIUM: {
            return Object.assign({}, state, {...state, premium: action.premium});
        }
        default:
            return state;
    }
};
