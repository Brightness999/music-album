import React from 'react';

import { Album } from '../models';
import { MusicFileType } from '../types';
import DownloadButton from './DownloadButton';
import { apiDownloadAlbum } from '../api/AlbumAPI';

interface Props {
    album?: Album;
    className?: string;
    type: MusicFileType;
}

export default function AlbumDownloadButton(props: Props) {
    return <DownloadButton
        label={ `all ${props.type} (.zip)` }
        type={props.type}
        disabled={ !props.album }
        target={props.album}
        download={() => props.album && apiDownloadAlbum(props.album.slug, props.type)}
        className={props.className+' btn-album-download'}/>;
}
