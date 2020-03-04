import axios, { AxiosResponse } from 'axios';

import { Album, DetailAlbum } from '../models';
import {
    API_FETCH_ALBUM,
    API_FETCH_ALL_ALBUMS,
    API_FETCH_FEATURED_ALBUMS,
    API_FETCH_TOP_ALBUMS
} from './apis';
import { environment } from '../environments/envrionment';

interface AlbumsResponse {
    albums: Album[];
    album_count: number;
}

interface DetailAlbumResponse {
    album: DetailAlbum;
}

export const apiFetchAllAlbums = async (skip: number, limit: number) => {
    console.log(`skip=${skip}, limit=${limit}`);
    const result: AxiosResponse<AlbumsResponse> = await axios(environment.API_URL + API_FETCH_ALL_ALBUMS + '?skip='+skip+'&limit='+limit);
    return [result.data.albums, result.data.album_count];
};

export const apiFetchFeaturedAlbums = async () => {
    const result: AxiosResponse<AlbumsResponse> = await axios(environment.API_URL + API_FETCH_FEATURED_ALBUMS);
    return result.data.albums;
};

export const apiFetchAlbumDetail = async(slug: string) => {
    const result: AxiosResponse<DetailAlbumResponse> = await axios(environment.API_URL + API_FETCH_ALBUM+slug);
    return result.data.album;
};

export const apiFetchTopAlbums = async () => {
    const result: AxiosResponse<AlbumsResponse> = await axios(environment.API_URL + API_FETCH_TOP_ALBUMS);
    return result.data.albums;
};
