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
    selectCurrentTrackSlug,
    selectPlayStatus
} from '../redux/selectors';
import {
    setCurrentTrackSlug,
    setPlayStatus
} from '../redux/actions';

interface Props {
    track: Track;
}

export default function ListTrackPlayButton(props: Props) {
    const dispatch = useDispatch();
    const trackSlug = useSelector(selectCurrentTrackSlug);
    const playStatus = useSelector(selectPlayStatus);
    return (<Button
        className="hl-control normal-control"
        onClick={() => {
            if (!dispatch) return;
            if (props.track.slug !== trackSlug) {
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
