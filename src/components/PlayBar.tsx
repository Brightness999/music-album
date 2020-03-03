import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import Marquee from 'react-text-marquee';
import ReactSound from 'react-sound';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faKeyboard,
    faPause,
    faPlay,
    faStepBackward,
    faStepForward,
    faVolumeUp
} from '@fortawesome/free-solid-svg-icons';
import PlayBarAvatar from '../assets/images/album.png';
import { PlayStatus } from '../redux/store';
import {
    nextTrack,
    previousTrack,
    requestTrack,
    setPlayStatus,
} from '../redux/actions';
import {
    selectCurrentTrack,
    selectCurrentTrackSlug,
    selectPlayList,
    selectPlayStatus,
} from '../redux/selectors';

import DownloadButton from './DownloadButton';

export default function PlayBar() {
    const trackSlug = useSelector(selectCurrentTrackSlug);
    const playStatus = useSelector(selectPlayStatus);
    const playList = useSelector(selectPlayList);
    const track = useSelector(selectCurrentTrack);
    const dispatch = useDispatch();
    useEffect(() => {
        if (trackSlug !== '') {
            dispatch(requestTrack(trackSlug));
        }
    }, [trackSlug, dispatch]);
    return (
        <div className="play-bar">
            <div className="img-wrapper">
                <img className="img-fluid" src={
                    track !== undefined?
                        `/uploads/albums/${track?.album.location}/thumb/${track?.album.slug}.jpg`:
                        PlayBarAvatar
                } alt="album"/>
            </div>
            <div className="playback-control-panel">
                <Button
                    className="hl-control normal-control"
                    onClick={() => dispatch && dispatch(previousTrack())}
                    disabled={track === undefined || playList.indexOf(trackSlug) === 0}>
                    <FontAwesomeIcon icon={faStepBackward}/>
                </Button>
                <Button
                    className="hl-control play-control"
                    disabled={track === undefined}
                    onClick={() => {
                        if (!dispatch) return;
                        if (playStatus === PlayStatus.PLAYING) {
                            dispatch(setPlayStatus(PlayStatus.PAUSED));
                        } else {
                            dispatch(setPlayStatus(PlayStatus.PLAYING));
                        }
                    }}>
                    <FontAwesomeIcon icon={
                        (playStatus === PlayStatus.STOPPED || playStatus === PlayStatus.PAUSED)?faPlay:faPause
                    }/>
                </Button>
                <Button
                    className="hl-control normal-control"
                    onClick={ () => dispatch && dispatch(nextTrack()) }
                    disabled={ track === undefined || playList.indexOf(trackSlug) === playList.length-1 }>
                    <FontAwesomeIcon icon={ faStepForward }/>
                </Button>
            </div>
            <div className="wave-form-panel">
                <div className="wave-title">
                    {
                        track !== undefined?
                        <Marquee text={ track?.artist.name + '-' + track?.title } />:
                        <div>Please select a track.</div>
                    }
                </div>
                <div className="wave-image-wrapper">
                    {
                        track !== undefined?
                        <img src={`/uploads/audios/${track?.album.location}/wavefiles/${track?.slug}.png`}
                             alt="waveform"/>
                             :<div/>
                    }
                </div>
                {
                    track !== undefined?
                        <ReactSound
                            url={`/uploads/audios/${track?.album.location}/${track?.slug}.mp3`}
                            playStatus={playStatus} />
                        :<span/>
                }
            </div>
            <div className="mute-control-panel">
                <Button
                    className="hl-control normal-control"
                    disabled={track === undefined}>
                    <FontAwesomeIcon icon={faVolumeUp}/>
                </Button>
                <Button
                    className="hl-control normal-control"
                    disabled={track === undefined}>
                    <FontAwesomeIcon icon={faKeyboard}/>
                </Button>
            </div>
            <div className="download-panel">
                <div className="author">
                    {
                        track !== undefined?
                            <div>
                                <NavLink to={`/album/${track.album.slug}`}>
                                    {track.album.title}
                                </NavLink>&nbsp;by&nbsp;
                                <NavLink to={`/album/${track.album.slug}`}>
                                    {track.album.publisher.name}
                                </NavLink>&nbsp;in&nbsp;
                                <NavLink to={`/genres/${track?.category.slug}`}>
                                    {track?.category.name}
                                </NavLink>
                            </div>:
                            <div/>
                    }

                </div>
                <div className="d-flex">
                    <DownloadButton track={ track } type="mp3" className="mx-2"/>
                    <DownloadButton track={ track } type="mp3" className="mx-2"/>
                </div>
            </div>
        </div>
    );
}
