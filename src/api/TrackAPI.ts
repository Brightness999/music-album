import axios, { AxiosResponse } from 'axios';

import { Album, Track } from '../models';
import {
  API_FETCH_GENRE_TRACKS,
  API_FETCH_PICKED_TRACKS,
  API_FETCH_SEARCH,
  API_FETCH_TRACK,
  API_FETCH_TRACKS
} from './apis';
import {
  composeSetAlbumBandcampPath,
  composeSetAlbumTopPath,
  composeSetAlbumVinylPath,
  composeTrackDownloadPath
} from '../common';
import { environment } from '../environments/envrionment';
import { apiDownload } from './common';

interface TracksResponse {
  tracks: Track[];
  track_count: number;
}

interface TrackResponse {
  track: Track;
}

interface DownloadTrackResponse {
  result: number;
  message: string;
}

interface SearchResponse {
  tracks: Track[];
  track_count: number;
  search_mode_value: string;
}

interface SetOnTopResponse {
  result: number;
  message: string;
  album: Album;
}

export const apiFetchTracks = async (skip: number, limit: number, publisherSlug: string, title: string) => {
  if (title === undefined) {
    title = '';
  }
  const result: AxiosResponse<TracksResponse> = await axios(environment.API_URL + API_FETCH_TRACKS + '?skip=' + skip + '&limit=' + limit + '&publisher=' + publisherSlug + '&title=' + title);
  return [result.data.tracks, result.data.track_count];
};

export const apiFetchPickedTracks = async (type: string, skip: number, limit: number, publisherSlug: string, title: string) => {
  if (title === undefined) {
    title = '';
  }
  const result: AxiosResponse<TracksResponse> = await axios(environment.API_URL + API_FETCH_PICKED_TRACKS + '?type='+type+'&skip=' + skip + '&limit=' + limit + '&publisher=' + publisherSlug + '&title=' + title);
  return [result.data.tracks, result.data.track_count];
};

export const apiFetchTrack = async (slug: string) => {
  const result: AxiosResponse<TrackResponse> = await axios(environment.API_URL + API_FETCH_TRACK + slug);
  return result.data.track;
};

export const apiFetchGenreTracks = async (skip: number, limit: number, categorySlug: string) => {
  const result: AxiosResponse<TracksResponse> = await axios(environment.API_URL + API_FETCH_GENRE_TRACKS + categorySlug + '?skip=' + skip + '&limit=' + limit);
  return [result.data.tracks, result.data.track_count];
};

export const apiDownloadTrack = async (slug: string, ext: string, check: string) => {
  const url = composeTrackDownloadPath(slug, ext, check);
  if (check === 'check') {
    const result: AxiosResponse<DownloadTrackResponse> = await axios(url);
    return [result.data.result, result.data.message];
  }

  if (check !== 'check') {
    apiDownload(url);
  }
};

export const apiFetchSearch = async (skip: number, limit: number, keyword: string) => {
  const result: AxiosResponse<SearchResponse> = await axios(environment.API_URL + API_FETCH_SEARCH + '?keyword=' + keyword + '&skip=' + skip + '&limit=' + limit);
  return [result.data.tracks, result.data.track_count, result.data.search_mode_value];
};

export const apiSetAlbumTop = async (albumId: string, onoff: number) => {
  const result: AxiosResponse<SetOnTopResponse> = await axios.post(composeSetAlbumTopPath(albumId), {onoff, token: localStorage.getItem('token')});
  return result.data;
}

export const apiSetAlbumVinyl = async (albumId: string, onoff: number) => {
  const result: AxiosResponse<SetOnTopResponse> = await axios.post(composeSetAlbumVinylPath(albumId), {onoff, token: localStorage.getItem('token')});
  return result.data;
}

export const apiSetAlbumBandcamp = async (albumId: string, onoff: number) => {
  const result: AxiosResponse<SetOnTopResponse> = await axios.post(composeSetAlbumBandcampPath(albumId), {onoff, token: localStorage.getItem('token')});
  return result.data;
}
