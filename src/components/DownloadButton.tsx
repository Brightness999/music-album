import React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import { Album, Track } from '../models';
import { MusicFileType } from '../types';
import { environment } from '../environments/envrionment';
import history from '../history';

interface Props {
    target?: Album | Track;
    label: string;
    disabled: boolean;
    className?: string;
    type: MusicFileType;
    download: (target: Album | Track) => void
}

export default function DownloadButton(props: Props) {
    return (
        <Button
            className={ "btn-download "+props.className }
            disabled={ props.disabled }
            onClick={ () => {
                if (environment.TEST_MODE) {
                    history.push('/premium');
                } else {
                    props.target && props.download(props.target)
                }
            } }>
                { props.label }&nbsp;&nbsp;<FontAwesomeIcon icon={ faDownload }/>
        </Button>);
}
