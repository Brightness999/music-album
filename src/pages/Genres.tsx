import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import ScrollArea from 'react-scrollbar';
import axios, { AxiosResponse } from 'axios';

import { scrollbarStyles } from '../consts';
import { Track } from '../models';
import GenreTitleHeader from '../components/GenreTitleHeader';
import ListTrackItem from '../components/ListTrackItem';
import AlbumPagination from '../components/AlbumPagination';

interface TracksResponse {
    tracks: Track[]
}

export default function GenresPage() {
    let { slug } = useParams();
    console.log(`slug = ${slug}`);
    const [tracks, setTracks] = useState<Track[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            let url: string;
            if (slug === undefined) {
                url = '/api/tracks';
            } else {
                // url = `/api/genre-tracks/${slug}`
                url = '/api/tracks';
            }
            const result: AxiosResponse<TracksResponse> = await axios(url);
            setTracks(result.data.tracks);
        };
        fetchData();
    }, [slug]);
    let albumContent;
    let lastGenreId: number = -1;
    let elmTracks = tracks.map((track: Track, index: number) => {
        if (lastGenreId === -1 || lastGenreId !== track.category.id) {
            lastGenreId = track.category.id;
            return <GenreTitleHeader key={index++} title={track.category.name}/>;
        }
        return <ListTrackItem track={track} />;
    });
    albumContent = (
        <div className="album-content">
            <Row className="album-header d-flex">
                <Col sm={6}>Artist & Title</Col>
                <Col sm={1}>Label</Col>
                <Col sm={1}>Genre</Col>
                <Col sm={4}/>
            </Row>
            <ScrollArea
                className="scroll-area"
                verticalScrollbarStyle={scrollbarStyles}
                verticalContainerStyle={scrollbarStyles}
                horizontal={false}
                smoothScrolling= {true}
                minScrollSize={40}
            >
                {elmTracks}
            </ScrollArea>
        </div>
    );

    return (
        <div className="page">
            { albumContent }
            <div className="d-flex justify-content-center align-items-center">
                <AlbumPagination/>
            </div>
        </div>
    );
}
