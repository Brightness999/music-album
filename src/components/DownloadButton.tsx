import React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import { Track } from '../models';
import { formatFilesize } from '../utils';
import { MusicFileType } from '../types';

interface Props {
    track?: Track;
    className?: string;
    type: MusicFileType;
}

export default function DownloadButton(props: Props) {
    const download = () => {
    };
    const fileSize = props.type === MusicFileType.FLAC ?
        props.track?.flac_size :
        props.track?.mp3_size;
    return (<Button
        className={ "download-button w-100 "+props.className }
        disabled={ props.track === undefined } onClick={ () => download() }>
            .{props.type} ({ formatFilesize(fileSize) })&nbsp;&nbsp;<FontAwesomeIcon icon={ faDownload }/>
        </Button>);
}
