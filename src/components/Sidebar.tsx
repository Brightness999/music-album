import React, {useEffect, useState} from 'react';

import TopAlbumItem from './TopAlbumItem';
import axios, {AxiosResponse} from "axios";
import {Album} from "../models";

interface ITopAlbums {
    topAlbums: Album[];
}

export default function Sidebar() {
    const [topAlbums, setTopAlbums] = useState<Album[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const result: AxiosResponse<ITopAlbums> = await axios('/api/top-albums');
            setTopAlbums(result.data.topAlbums);
        };
        fetchData();
    }, []);
    let elmAlbums: JSX.Element[] = [];
    let index = 0;
    topAlbums.forEach((album: Album) => {
        elmAlbums.push(<TopAlbumItem album={album} key={index++}/>);
    });
    return(
        <div className="sidebar">
            <div className="pt-4 pl-4 pb-5">Top {topAlbums.length} albums</div>
            { elmAlbums }
        </div>
    );
}