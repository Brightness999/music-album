import React, {useEffect, useState} from 'react';
import ScrollArea from 'react-scrollbar';
import axios, {AxiosResponse} from 'axios';

import LargeAlbumItem from '../components/LargeAlbumItem';
import { IAlbum } from '../interfaces';


import { scrollbarStyles } from '../consts';

export interface IFeaturedReleases {
    featuredAlbums: []
}

export default function Home() {
    const [featuredAlbums, setFeaturedAlbums] = useState<IAlbum[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const result: AxiosResponse<IFeaturedReleases> = await axios(
                'api/featured-albums',
            );
            setFeaturedAlbums(result.data.featuredAlbums);
        };
        fetchData();
    }, []);
    let elmFeaturedAlbums: JSX.Element[] = [];
    let index = 0;

    featuredAlbums.forEach((album: IAlbum) => {
        elmFeaturedAlbums.push(<div className="col-20" key={index++}><LargeAlbumItem album={album} /></div>);
    });
    return (
        <div className="page">
            <p className="page-title">Featured releases</p>
            <div className="album-content">
                <ScrollArea
                    className="scroll-area"
                    verticalScrollbarStyle={scrollbarStyles}
                    verticalContainerStyle={scrollbarStyles}
                    horizontal={false}
                    smoothScrolling= {true}
                    minScrollSize={40}
                >
                    <div className="d-flex flex-wrap">
                        {elmFeaturedAlbums}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}