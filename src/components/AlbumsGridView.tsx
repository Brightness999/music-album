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
    return (
        <div className="album-content">
            <div className="text-right">
                { formatSimpleDate(latestReleaseDate) }
            </div>
            <div className="d-flex flex-wrap">
                {
                    props.albums.map((album: Album, index: number) =>
                        <div className="col-20" key={index}>
                            <LargeAlbumItem album={album} />
                        </div>)
                }
            </div>
        </div>
    )
}
