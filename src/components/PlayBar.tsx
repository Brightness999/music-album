import React, {useEffect, useState} from 'react';
import PlayBarAvatar from '../assets/images/album.jpg';
import {Button} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward, faStepForward, faPlay, faVolumeUp, faKeyboard } from '@fortawesome/free-solid-svg-icons'
import Marquee from "react-text-marquee";
import {useSelector} from "react-redux";
import axios from "axios";
import DownloadButton from "./DownloadButton";
import {Track} from "../models";
import {selectCurrentTrack} from "../store";

export default function PlayBar() {
    const track_slug = useSelector(selectCurrentTrack);
    const [track, setTrack] = useState<Track>();
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`/api/track/${track_slug}`);
            setTrack(result.data.track);
        };
        fetchData();
    }, [track_slug]);
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
                <Button className="hl-control normal-control" disabled={track === undefined}><FontAwesomeIcon icon={faStepBackward}/></Button>
                <Button className="hl-control play-control" disabled={track === undefined}><FontAwesomeIcon icon={faPlay}/></Button>
                <Button className="hl-control normal-control" disabled={track === undefined}><FontAwesomeIcon icon={faStepForward}/></Button>
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
            </div>
            <div className="mute-control-panel">
                <Button className="hl-control normal-control" disabled={track === undefined}><FontAwesomeIcon icon={faVolumeUp}/></Button>
                <Button className="hl-control normal-control" disabled={track === undefined}><FontAwesomeIcon icon={faKeyboard}/></Button>
            </div>
            <div className="download-panel">
                <div className="author">
                    <a>SnakerCharmer</a> by <a>Lisztomania</a> in <a>Tech House</a>
                </div>
                <div className="d-flex">
                    <DownloadButton track={track} type="mp3" className="mx-2"/>
                    <DownloadButton track={track} type="mp3" className="mx-2"/>
                </div>
            </div>
        </div>
    );
}