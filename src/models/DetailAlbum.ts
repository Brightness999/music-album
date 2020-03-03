import { Album } from './Album';
import { Track } from './Track';

export interface DetailAlbum extends Album {
    tracks: Track[];
}

export interface DetailAlbum {
    album: DetailAlbum;
}
