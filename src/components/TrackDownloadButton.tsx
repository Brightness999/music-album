import React from 'react';

import { Track } from '../models';
import { formatFileSize } from '../utils';
import { MusicFileType } from '../types';
import DownloadButton from './DownloadButton';
import { useDispatch } from 'react-redux';
import { requestDownloadTrack } from '../redux/actions';
import { environment } from '../environments/envrionment';

interface Props {
    track?: Track;
    className?: string;
    type: MusicFileType;
}

export default function TrackDownloadButton(props: Props) {
    let fileSize: number = -1;
    const dispatch = useDispatch();
    if (props.track) {
        fileSize = props.type === MusicFileType.FLAC ?
            props.track.flac_size :
            props.track.mp3_size;
    }
    const label = environment.TEST_MODE ? `.${props.type}` : `.${props.type} (${formatFileSize(fileSize)})`;
    return <DownloadButton
        label={ label }
        type={props.type}
        disabled={ props.track === undefined }
        target={props.track}
        download={() => props.track && dispatch(requestDownloadTrack(props.track.slug, props.type))}
        className={props.className}/>;
}
