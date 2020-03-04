import { environment } from '../environments/envrionment';

export const composeAlbumImagePath = (albumLocation?: string, albumSlug?: string) => {
    return `${environment.API_URL}/uploads/albums/${albumLocation}/thumb/${albumSlug}.jpg`;
};

export const composeDownloadPath = (trackSlug?: string, ext?: string) => {
    return `${environment.API_URL}/api/download-track/${trackSlug}/as/${ext}`;
};

export const composeMusicFilePath = (albumSlug?: string) => {
    return `${environment.API_URL}/api/stream-mp3/${albumSlug}`;
};

export const composeWaveformImagePath = (albumLocation?: string, trackSlug?: string) => {
    return `${environment.API_URL}/uploads/audios/${albumLocation}/wavefiles/${trackSlug}.png`;
};
