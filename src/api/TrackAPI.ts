import axios, { AxiosResponse } from 'axios';

import { Track } from '../models';
import {
    API_FETCH_TRACK,
    API_FETCH_TRACKS
} from './apis';

interface TracksResponse {
    tracks: Track[];
}

interface TrackResponse {
    track: Track;
}

export const apiFetchTracks = async () => {
    const result: AxiosResponse<TracksResponse> = await axios(API_FETCH_TRACKS);
    return result.data.tracks;
};

export const apiFetchTrack = async(slug: string) => {
    const result: AxiosResponse<TrackResponse> = await axios(API_FETCH_TRACK + slug);
    return result.data.track;
};
