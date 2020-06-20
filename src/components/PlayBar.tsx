import React, { Component, createRef, useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import Marquee from 'react-text-marquee';
import ReactSound, { OnPlayingParams, ReactSoundProps } from 'react-sound';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPause,
  faPlay,
  faStepBackward,
  faStepForward,
  faVolumeMute,
  faVolumeUp
} from '@fortawesome/free-solid-svg-icons';
import PlayBarAvatar from '../assets/images/album.png';
import { PlayStatus } from '../redux/store';
import { nextTrack, previousTrack, requestTrack, setMuted, setPlayStatus, } from '../redux/actions';
import {
  selectCurrentTrack,
  selectCurrentTrackSlug,
  selectMuted,
  selectPlayList,
  selectPlayStatus,
} from '../redux/selectors';
import { NavLink } from 'react-router-dom';
import TrackDownloadButton from './TrackDownloadButton';
import { MusicFileType } from '../types';
import {
  composeAlbumImagePath,
  composeMusicFilePath,
  composeMusicPreviewFilePath,
  composeTrackName,
  composeWaveformImagePath
} from '../common';
import { environment } from '../environments/envrionment';
import { previewLength } from '../consts';


export default function PlayBar() {
  const trackSlug = useSelector(selectCurrentTrackSlug);
  const playStatus = useSelector(selectPlayStatus);
  const playList = useSelector(selectPlayList);
  const track = useSelector(selectCurrentTrack);
  const muted = useSelector(selectMuted);
  const [playPosition, setPlayPosition] = useState(0);
  const [playDuration, setPlayDuration] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const dispatch = useDispatch();

  const refPlayer = createRef<Component<ReactSoundProps>>();
  const refSeekBar = createRef<HTMLDivElement>();
  const refPlayerWrapper = createRef<HTMLDivElement>();

  useEffect(() => {
    if (trackSlug !== '') {
      dispatch(requestTrack(trackSlug));
    }
    setPlayPosition(0);
  }, [trackSlug, dispatch]);

  useEffect(() => {
    if (track && refPlayerWrapper && environment.TEST_MODE) {
      // TODO: uncomment lines when using preview mode
      // const duration = Math.floor(track.duration / 1000);
      // if (duration > previewLength) {
      //   const startPoint = (duration - previewLength) / 2;
      //   const startPointPercent = 100 * startPoint / duration;
      //   if (refPlayerWrapper.current) {
      //     refPlayerWrapper.current.style.left = `${startPointPercent}%`;
      //     refPlayerWrapper.current.style.right = `${startPointPercent}%`;
      //   }
      // } else {
        if (refPlayerWrapper && refPlayerWrapper.current) {
          refPlayerWrapper.current.style.left = '0';
          refPlayerWrapper.current.style.right = '0';
        }
      // }
    }
  }, [track]);

  return (
    <div className="play-bar position-fixed d-flex align-items-center w-100">
      <div className="img-wrapper">
        <img className="img-fluid" src={
          track !== undefined ?
            composeAlbumImagePath(track?.album.location, track?.album.slug) :
            PlayBarAvatar
        } alt="album"/>
      </div>
      <div className="playback-control-wrapper">
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
            (playStatus === PlayStatus.STOPPED || playStatus === PlayStatus.PAUSED) ? faPlay : faPause
          }/>
        </Button>
        <Button
          className="hl-control normal-control"
          onClick={() => dispatch && dispatch(nextTrack())}
          disabled={track === undefined || playList.indexOf(trackSlug) === playList.length - 1}>
          <FontAwesomeIcon icon={faStepForward}/>
        </Button>
      </div>
      <div className="wave-form-panel">
        <div className="wave-title">
          {track !== undefined ?
              <Marquee text={composeTrackName(track)}/> :
              <div>Please select a track.</div>}
        </div>
        <div className="wave-container">
          <div className="wave-image-wrapper">
            {track !== undefined ?
              <img src={composeWaveformImagePath(track?.album.location, track?.slug)}
                   alt="waveform"/>
              : <div/>}
          </div>
          <div
            ref={refPlayerWrapper}
            onMouseDown={(event) => {
              if (!refPlayerWrapper.current) return;
              const playerRect = refPlayerWrapper.current.getBoundingClientRect();
              const pressedX = event.clientX - playerRect.x;
              const newPlayPosition = Math.floor(playDuration * pressedX / playerRect.width);
              setPlayPosition(newPlayPosition);
              setMouseDown(true);
            }}
            onMouseMoveCapture={(event) => {
              if (!mouseDown) return;
              if (!refPlayerWrapper.current) return;
              const playerRect = refPlayerWrapper.current.getBoundingClientRect();
              const pressedX = event.clientX - playerRect.x;
              const newPlayPosition = Math.floor(playDuration * pressedX / playerRect.width);
              setPlayPosition(newPlayPosition);
            }}
            onMouseUp={() => setMouseDown(false)}
            className="controller-wrapper">
            <div className="seek-bar position-absolute h-100" ref={refSeekBar}/>
          </div>
          {
            track !== undefined ?
              <ReactSound
                volume={muted ? 0 : 100}
                ref={refPlayer}
                position={playPosition}
                onPlaying={(params: OnPlayingParams) => {
                  if (!refSeekBar.current) {
                    return;
                  }
                  refSeekBar.current.style.width = `${100 * params.position / params.duration}%`;
                  setPlayPosition(params.position);
                  setPlayDuration(params.duration);
                }}
                onFinishedPlaying={() => {
                  dispatch(setPlayStatus(PlayStatus.STOPPED));
                  dispatch(nextTrack());
                }}
                // url={environment.TEST_MODE ? composeMusicPreviewFilePath(track?.slug) : composeMusicFilePath(track?.slug)}
                url={composeMusicFilePath(track?.slug)}
                playStatus={playStatus}/>
              : <span/>
          }
        </div>
      </div>
      <div className="mute-control-wrapper">
        <Button
          className="hl-control normal-control w-50"
          onClick={() => dispatch(setMuted(!muted))}
          disabled={track === undefined}>
          <FontAwesomeIcon icon={muted ? faVolumeMute : faVolumeUp}/>
        </Button>
      </div>
      <div className="download-wrapper">
        <div className="author">
          {
            track !== undefined ?
              <div>
                <NavLink to={`/album/${track.album.slug}`}>
                  {track.album.title.replace('&amp;', '&')}
                </NavLink>&nbsp;by&nbsp;
                <NavLink to={`/all-releases/${track.album.publisher.slug}/s/GRID/p/0`}>
                  {track.album.publisher.name}
                </NavLink>&nbsp;in&nbsp;
                <NavLink to={`/genres/${track?.category.slug}/s/LIST/p/0`}>
                  {track?.category.name}
                </NavLink>
              </div> :
              <div>&nbsp;</div>
          }
        </div>
        <div className="d-flex">
          <TrackDownloadButton track={track} type={MusicFileType.MP3} className="mx-2"/>
          <TrackDownloadButton track={track} type={MusicFileType.FLAC} className="mx-2"/>
        </div>
      </div>
    </div>
  );
}
