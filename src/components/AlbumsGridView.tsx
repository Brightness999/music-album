import React from 'react';
import { Album } from '../models';
import LargeAlbumItem from './LargeAlbumItem';

interface Props {
    albums: Album[];
}

export default function AlbumsGridView(props: Props) {
    return (
        <div className="album-content">
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
