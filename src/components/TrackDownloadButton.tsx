import React from 'react';

import { Track } from '../models';
import { formatFilesize } from '../utils';
import { MusicFileType } from '../types';
import { apiDownloadTrack } from '../api/TrackAPI';
import DownloadButton from './DownloadButton';

interface Props {
    track?: Track;
    className?: string;
    type: MusicFileType;
}

export default function TrackDownloadButton(props: Props) {
    let fileSize: number = -1;
    if (props.track) {
        fileSize = props.type === MusicFileType.FLAC ?
            props.track.flac_size :
            props.track.mp3_size;
    }
    return <DownloadButton
        label={ `.${props.type} (${formatFilesize(fileSize)})` }
        type={props.type}
        disabled={ props.track === undefined }
        target={props.track}
        download={() => props.track && apiDownloadTrack(props.track.slug, props.type)}
        className={props.className}/>;
}
