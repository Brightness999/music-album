import { environment } from '../environments/envrionment';
import { Artist, Track } from '../models';

export const composeAlbumImagePath = (albumLocation?: string, albumSlug?: string) => {
    return `${environment.API_URL}/uploads/albums/${albumLocation}/thumb/${albumSlug}.jpg`;
};

export const composeTrackDownloadPath = (trackSlug?: string, ext?: string, check?: string) => {
    return `${environment.API_URL}/api/download-track/${trackSlug}/as/${ext}/${check}?token=${localStorage.getItem('token')}`;
};

export const composeAlbumDownloadPath = (albumSlug?: string, ext?: string, check?: string) => {
    return `${environment.API_URL}/api/download-album/${albumSlug}/as/${ext}/${check}?token=${localStorage.getItem('token')}`;
};

export const composeMusicFilePath = (albumSlug?: string) => {
    return `${environment.API_URL}/api/stream-mp3/${albumSlug}`;
};

export const composeWaveformImagePath = (albumLocation?: string, trackSlug?: string) => {
    return `${environment.API_URL}/uploads/audios/${albumLocation}/wavefiles/${trackSlug}.png`;
};

export function composeTrackName(track?: Track, artist?: Artist) {
    if (artist === undefined) {
        return `${track?.artist.name} - ${track?.title}`;
    }
    return `${artist?.name} - ${track?.title}`;
}
