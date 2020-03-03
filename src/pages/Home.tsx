import React, { useEffect, useState } from 'react';
import ScrollArea from 'react-scrollbar';
import axios, { AxiosResponse } from 'axios';

import { scrollbarStyles } from '../consts';
import { Album } from '../models';
import LargeAlbumItem from '../components/LargeAlbumItem';

export interface FeaturedReleasesResponse {
    featuredAlbums: []
}

export default function Home() {
    const [featuredAlbums, setFeaturedAlbums] = useState<Album[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const result: AxiosResponse<FeaturedReleasesResponse> = await axios(
                '/api/featured-albums',
            );
            setFeaturedAlbums(result.data.featuredAlbums);
        };
        fetchData();
    }, []);
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
                        {
                            featuredAlbums.map((album: Album, index: number) =>
                                <div className="col-20" key={index++}><LargeAlbumItem album={album} /></div>)
                        }
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}