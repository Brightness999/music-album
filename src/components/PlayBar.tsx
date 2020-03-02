import React, {useEffect, useState} from 'react';
import PlayBarAvatar from '../assets/images/album.jpg';
import {Button} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faKeyboard, faPause, faPlay, faStepBackward, faStepForward, faVolumeUp} from '@fortawesome/free-solid-svg-icons'
import Marquee from "react-text-marquee";
import {useDispatch, useSelector} from "react-redux";
import ReactSound from "react-sound";
import axios from "axios";
import {Track} from "../models";
import DownloadButton from "./DownloadButton";
import {nextTrack, previousTrack, selectCurrentTrack, selectPlayList, selectPlayStatus, setPlayStatus} from "../store";
import {NavLink} from "react-router-dom";

export default function PlayBar() {
    const track_slug = useSelector(selectCurrentTrack);
    const play_status = useSelector(selectPlayStatus);
    const play_list = useSelector(selectPlayList);
    const [track, setTrack] = useState<Track>();
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`/api/track/${track_slug}`);
            setTrack(result.data.track);
            if (result.data.track !== undefined) {
                dispatch(setPlayStatus('PLAYING'));
            }
        };
        fetchData();
    }, [track_slug, dispatch]);
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
                    disabled={track === undefined || play_list.indexOf(track_slug) === 0}>
                    <FontAwesomeIcon icon={faStepBackward}/>
                </Button>
                <Button
                    className="hl-control play-control"
                    disabled={track === undefined}
                    onClick={() => {
                        if (!dispatch) return;
                        if (play_status === 'PLAYING') {
                            dispatch(setPlayStatus('PAUSED'));
                        } else {
                            dispatch(setPlayStatus('PLAYING'));
                        }
                    }}
                >
                    <FontAwesomeIcon icon={
                        (play_status==='STOPPED' || play_status === 'PAUSED')?faPlay:faPause
                    }/>
                </Button>
                <Button
                    className="hl-control normal-control"
                    onClick={() => dispatch && dispatch(nextTrack())}
                    disabled={track === undefined || play_list.indexOf(track_slug) === play_list.length-1}>
                    <FontAwesomeIcon icon={faStepForward}/>
                </Button>
            </div>
            <div className="wave-form-panel">
                <div className="wave-title">
                    {
                        track !== undefined?
                        <Marquee text={track?.artist.name + '-' + track?.title} />:
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
                        <ReactSound url={`/uploads/audios/${track?.album.location}/${track?.slug}.mp3`} playStatus={play_status} />
                        :<span/>
                }
            </div>
            <div className="mute-control-panel">
                <Button
                    className="hl-control normal-control"
                    disabled={track === undefined}>
                    <FontAwesomeIcon icon={faVolumeUp}/></Button>
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
                    <DownloadButton track={track} type="mp3" className="mx-2"/>
                    <DownloadButton track={track} type="mp3" className="mx-2"/>
                </div>
            </div>
        </div>
    );
}