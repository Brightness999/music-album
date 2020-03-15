import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPause,
    faPlay
} from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';
import {
    useDispatch,
    useSelector
} from 'react-redux';

import { Track } from '../models';
import { PlayStatus } from '../redux/store';
import {
    selectCurrentAlbumDetail,
    selectCurrentTrackSlug,
    selectPlayStatus, selectTracks
} from '../redux/selectors';
import {
    setCurrentTrackSlug, setPlayList,
    setPlayStatus
} from '../redux/actions';
import history from '../history';

interface Props {
    track: Track;
}

export default function ListTrackPlayButton(props: Props) {
    const dispatch = useDispatch();
    const trackSlug = useSelector(selectCurrentTrackSlug);
    const playStatus = useSelector(selectPlayStatus);
    const album = useSelector(selectCurrentAlbumDetail);
    const tracks = useSelector(selectTracks);
    return (<Button
        className="hl-control normal-control"
        onClick={() => {
            if (!dispatch) return;
            if (props.track.slug !== trackSlug) {
                const currentRoute = history.location.pathname;
                let playListTracks;
                if (currentRoute.startsWith('/album')) {
                    playListTracks = album?.tracks;
                } else if (currentRoute.startsWith('/all-releases') || currentRoute.startsWith('/genres') || currentRoute.startsWith('/search')) {
                    playListTracks = tracks;
                }
                if (playListTracks) {
                    dispatch(setPlayList(playListTracks.map(track => track.slug)));
                }
                dispatch(setCurrentTrackSlug(props.track.slug));
                return;
            }
            if (playStatus === PlayStatus.PLAYING) {
                dispatch(setPlayStatus(PlayStatus.PAUSED));
            } else if (playStatus === PlayStatus.PAUSED) {
                dispatch(setPlayStatus(PlayStatus.PLAYING));
            }
        }}>
        <FontAwesomeIcon icon={
            trackSlug === props.track.slug?
                ((playStatus === PlayStatus.STOPPED || playStatus === PlayStatus.PAUSED)?faPlay:faPause):
                faPlay
        }/>
    </Button>);
}
