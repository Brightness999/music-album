import axios, { AxiosResponse } from 'axios';
import { Track } from '../models';

interface TracksResponse {
    tracks: Track[]
}

export const apiFetchTracks = async () => {
    const result: AxiosResponse<TracksResponse> = await axios(
        '/api/tracks'
    );
    return result.data.tracks;
}
