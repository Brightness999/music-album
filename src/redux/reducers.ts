import { initialState, StoreState } from './store';
import {
    ActionType,
    NEXT_TRACK,
    PREVIOUS_TRACK,
    SET_CURRENT_TRACK,
    SET_PLAY_LIST,
    SET_PLAY_STATUS,
    SET_SHOW_MODE
} from './actions';

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
