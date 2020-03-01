import React from 'react';
import {Track} from "../models";
import {selectCurrentTrack, selectPlayStatus, setCurrentTrack, setPlayStatus} from "../store";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay} from "@fortawesome/free-solid-svg-icons";
import {Button} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";

interface IProps {
    track: Track;
}

export default function ListTrackPlayButton(props: IProps) {
    const dispatch = useDispatch();
    const track_slug = useSelector(selectCurrentTrack);
    const play_status = useSelector(selectPlayStatus);
    return (<Button
        className="hl-control normal-control"
        onClick={() => {
            if (!dispatch) return;
            if (props.track.slug !== track_slug) {
                dispatch(setCurrentTrack(props.track.slug));
                return;
            }
            if (play_status === 'PLAYING') {
                dispatch(setPlayStatus('PAUSED'));
            } else if (play_status === 'PAUSED') {
                dispatch(setPlayStatus('PLAYING'));
            }
        }}>
        <FontAwesomeIcon icon={
            track_slug === props.track.slug?
                ((play_status === 'STOPPED' || play_status === 'PAUSED')?faPlay:faPause):
                faPlay
        }/>
    </Button>);
}