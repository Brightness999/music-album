import React from 'react';
import PlayBarAvatar from '../assets/images/2.png';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward, faStepForward, faPlay, faVolumeUp, faKeyboard, faDownload } from '@fortawesome/free-solid-svg-icons'
import WaveForm from '../assets/images/wave.png';
import Marquee from "react-text-marquee";

export default function PlayBar() {
    return (
        <div className="play-bar">
            <div className="img-wrapper">
                <img className="img-fluid" src={PlayBarAvatar} alt="album"/>
            </div>
            <div className="playback-control-panel">
                <Button className="hl-control normal-control"><FontAwesomeIcon icon={faStepBackward}></FontAwesomeIcon></Button>
                <Button className="hl-control play-control"><FontAwesomeIcon icon={faPlay}></FontAwesomeIcon></Button>
                <Button className="hl-control normal-control"><FontAwesomeIcon icon={faStepForward}></FontAwesomeIcon></Button>
            </div>
            <div className="wave-form-panel">
                <div className="wave-title">
                    <Marquee text={"Toddy Terry Soul Speech - Feelin' (Original Mix)"} />
                </div>
                <div className="wave-image-wrapper">
                    <img src={WaveForm} alt="waveform" />
                </div>
            </div>
            <div className="mute-control-panel">
                <Button className="hl-control normal-control"><FontAwesomeIcon icon={faVolumeUp}></FontAwesomeIcon></Button>
                <Button className="hl-control normal-control"><FontAwesomeIcon icon={faKeyboard}></FontAwesomeIcon></Button>
            </div>
            <div className="download-panel">
                <div className="author">
                    <a>SnakerCharmer</a> by <a>Lisztomania</a> in <a>Tech House</a>
                </div>
                <div className="d-flex">
                    <Button className="download-button mr-2">
                        .mp3 (110.95 Mb)&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
                    </Button>
                    <Button className="download-button">
                        .flac (110.95 Mb)&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
                    </Button>
                </div>
            </div>
        </div>
    );
}