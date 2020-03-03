import axios, { AxiosResponse } from 'axios';
import { Album, DetailAlbum } from '../models';

interface AlbumsResponse {
    albums: Album[]
}

export const apiFetchAllAlbums = async () => {
    const result: AxiosResponse<AlbumsResponse> = await axios('/api/albums');
    return result.data.albums;
};

export const apiFetchFeaturedAlbums = async () => {
    const result: AxiosResponse<AlbumsResponse> = await axios('/api/featured-albums');
    return result.data.albums;
}

export const apiFetchAlbumDetail = async(slug: string) => {
    const result: AxiosResponse<DetailAlbum> = await axios(`/api/album/${slug}`);
    return result.data;
}
