import React from 'react';
import {selectCurrentTrack, selectPlayStatus, setCurrentTrack, setPlayStatus} from "../store";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay} from "@fortawesome/free-solid-svg-icons";
import {Button} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";

import {Track} from "../models";

interface Props {
    track: Track;
}

export default function ListTrackPlayButton(props: Props) {
    const dispatch = useDispatch();
    const trackSlug = useSelector(selectCurrentTrack);
    const playStatus = useSelector(selectPlayStatus);
    return (<Button
        className="hl-control normal-control"
        onClick={() => {
            if (!dispatch) return;
            if (props.track.slug !== trackSlug) {
                dispatch(setCurrentTrack(props.track.slug));
                return;
            }
            if (playStatus === 'PLAYING') {
                dispatch(setPlayStatus('PAUSED'));
            } else if (playStatus === 'PAUSED') {
                dispatch(setPlayStatus('PLAYING'));
            }
        }}>
        <FontAwesomeIcon icon={
            trackSlug === props.track.slug?
                ((playStatus === 'STOPPED' || playStatus === 'PAUSED')?faPlay:faPause):
                faPlay
        }/>
    </Button>);
}