import React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import { Track } from '../models';
import { formatFilesize } from '../utils';

interface Props {
    track?: Track;
    className?: string;
    type: 'mp3' | 'flac';
}

export default function DownloadButton(props: Props) {
    const download = () => {
    };
    return (<Button
        className={"download-button w-100 "+props.className}
        disabled={props.track === undefined} onClick={() => download()}>
            .{props.type} ({formatFilesize(props.track?.filesize)})&nbsp;&nbsp;<FontAwesomeIcon icon={faDownload}/>
        </Button>);
}