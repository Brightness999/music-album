import React, {useEffect, useState} from 'react';
import axios, {AxiosResponse} from 'axios';

import {Album} from '../models';
import TopAlbumItem from './TopAlbumItem';

interface TopAlbumsResponse {
    topAlbums: Album[];
}

export default function Sidebar() {
    const [topAlbums, setTopAlbums] = useState<Album[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const result: AxiosResponse<TopAlbumsResponse> = await axios('/api/top-albums');
            setTopAlbums(result.data.topAlbums);
        };
        fetchData();
    }, []);
    return(
        <div className="sidebar">
            <div className="pt-4 pl-4 pb-5">Top {topAlbums.length} albums</div>
            {
                topAlbums.map((album: Album, index: number) => <TopAlbumItem album={album} key={index}/>)
            }
        </div>
    );
}