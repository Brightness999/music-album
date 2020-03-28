import React from 'react';
import { Album } from '../models';
import LargeAlbumItem from './LargeAlbumItem';
import { formatSimpleDate } from '../utils';

interface Props {
    albums: Album[];
}

export default function AlbumsGridView(props: Props) {
    let latestReleaseDate = new Date(1900, 1, 1);
    props.albums.forEach(album => {
        const createdAt = new Date(album.created_at);
        if (createdAt > latestReleaseDate) {
            latestReleaseDate = createdAt;
        }
    });

    let elmAlbums: JSX.Element[] = [];
    let lastDate = '';
    let index = 0;
    props.albums.forEach(album => {
        const albumDate = formatSimpleDate(album.created_at);
        if (lastDate !== albumDate) {
            lastDate = albumDate;
            elmAlbums.push(<div className="w-100 pl-3 py-1 albums-grid-date-separator" key={index++}>{lastDate}</div>);
        }
        elmAlbums.push(<div className="col-20" key={index++}><LargeAlbumItem album={album} /></div>);
    });

    return (
        <div className="album-content">
            <div className="d-flex flex-wrap">
                { elmAlbums }
            </div>
        </div>
    )
}
