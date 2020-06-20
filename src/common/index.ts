import { environment } from '../environments/envrionment';
import { Artist, Track } from '../models';
import { ShowMode } from '../redux/store';
import history from '../history';

export const composeAlbumImagePath = (albumLocation?: string, albumSlug?: string) => {
    return `${environment.CDN_URL}/uploads/albums/${albumLocation}/thumb/${albumSlug}.jpg`;
};

export const composeTrackDownloadPath = (trackSlug?: string, ext?: string, check?: string) => {
    return `${environment.API_URL}/api/download-track/${trackSlug}/as/${ext}/${check}?token=${localStorage.getItem('token')}`;
};

export const composeSetAlbumTopPath = (albumSlug: string) => {
    return `${environment.API_URL}/api/album/${albumSlug}/set-top`;
}

export const composeSetAlbumVinylPath = (albumSlug: string) => {
    return `${environment.API_URL}/api/album/${albumSlug}/set-vinyl`;
}

export const composeSetAlbumBandcampPath = (albumSlug: string) => {
    return `${environment.API_URL}/api/album/${albumSlug}/set-bandcamp`;
}

export const composeAlbumDownloadPath = (albumSlug?: string, ext?: string, check?: string) => {
    return `${environment.API_URL}/api/download-album/${albumSlug}/as/${ext}/${check}?token=${localStorage.getItem('token')}`;
};

export const composeMusicFilePath = (albumSlug?: string) => {
    return `${environment.CDN_URL}/api/stream-mp3/${albumSlug}.mp3`;
};

export const composeMusicPreviewFilePath = (albumSlug?: string) => {
    return `${environment.CDN_URL}/api/stream-mp3-preview/${albumSlug}.mp3`;
};

export const composeWaveformImagePath = (albumLocation?: string, trackSlug?: string) => {
    return `${environment.CDN_URL}/uploads/audios/${albumLocation}/wavefiles/${trackSlug}.png`;
};

export function composeTrackName(track?: Track, artist?: Artist) {
    if (artist === undefined) {
        return `${track?.artist.name} - ${track?.title}`.replace('&amp;', '&');
    }
    return `${artist?.name} - ${track?.title}`.replace('&amp;', '&');
}

export function composePreviousPageLink(pathName: string, pageCount: number) {
    const matches = pathName.match(/(.*\/)(\d+)/);
    if (matches && matches.length) {
        const address = matches[1];
        const page = +matches[2];
        if (pageCount > 1) {
            if (page-1 >= 0) {
                return `${address}${page - 1}`;
            } else {
                return pathName;
            }
        } else {
            return `${address}0`;
        }
    }
    // assume unreachable
    return pathName;
}

export function composeValidPageLink(pathName: string, pageCount: number) {
    const matches = pathName.match(/(.*\/)(\d+)/);
    if (matches && matches.length) {
        const address = matches[1];
        const page = +matches[2];
        if (page < 0 || page >= pageCount) {
            return `${address}0`;
        } else {
            return pathName;
        }
    }
    // assume unreachable
    return pathName;
}

export function composePageLink(pathName: string, pageCount: number, pageNum: number) {
    const matches = pathName.match(/(.*\/)(\d+)/);
    if (matches && matches.length) {
        const address = matches[1];
        if (pageNum < 0 || pageNum >= pageCount) {
            return `${address}0`;
        } else {
            return `${address}${pageNum}`;
        }

    }
    // assume unreachable
    return pathName;
}

export function composeNextPageLink(pathName: string, pageCount: number) {
    const matches = pathName.match(/(.*\/)(\d+)/);
    if (matches && matches.length) {
        const address = matches[1];
        const page = +matches[2];
        if (pageCount > 1) {
            if (page+1 < pageCount) {
                return `${address}${page + 1}`;
            } else {
                return pathName;
            }
        } else {
            return `${address}0`;
        }
    }
    // assume unreachable
    return pathName;
}

export function changeShowModeLink(showMode: ShowMode) {
    const pathName = history.location.pathname;
    const matches = pathName.match(/(.*)\/s\/.+\/p\/(\d+)/);
    if (matches && matches.length) {
        const address = matches[1];
        const page = +matches[2];
        return `${address}/s/${showMode}/p/${page}`;
    }
    // assume unreachable
    return pathName;
}
