import React from 'react';
import { useParams } from 'react-router-dom';

export default function AlbumPages() {
    let { album_id } = useParams();
    return (
        <div className="page">
            <p className="page-title">{ album_id }</p>
        </div>
    );
}