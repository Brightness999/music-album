import axios, { AxiosResponse } from 'axios';

import { Track } from '../models';
import {
    API_FETCH_GENRE_TRACKS,
    API_FETCH_TRACK,
    API_FETCH_TRACKS
} from './apis';
import { composeDownloadPath } from '../common';
import { environment } from '../environments/envrionment';

interface TracksResponse {
    tracks: Track[];
}

interface TrackResponse {
    track: Track;
}

export const apiFetchTracks = async () => {
    const result: AxiosResponse<TracksResponse> = await axios(environment.API_URL + API_FETCH_TRACKS);
    return result.data.tracks;
};

export const apiFetchTrack = async(slug: string) => {
    const result: AxiosResponse<TrackResponse> = await axios(environment.API_URL + API_FETCH_TRACK + slug);
    return result.data.track;
};

export const apiFetchGenreTracks = async(slug: string) => {
    const result: AxiosResponse<TracksResponse> = await axios(environment.API_URL + API_FETCH_GENRE_TRACKS + slug);
    return result.data.tracks;
};

export const apiDownloadTrack = (slug?: string, ext?: string) => {
    const url = composeDownloadPath(slug, ext);
    const link = document.createElement('a');
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
