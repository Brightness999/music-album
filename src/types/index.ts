export enum MusicFileType {
    FLAC = 'flac',
    MP3 = 'mp3'
}

export interface UserInfo {
    name: string;
    email: string;
    expirationDate: number;
    downloadLimit: number;
    downloadedData: number;
    specialDownloadLimit: number;
    specialDownloadedData: number;
    admin: number;
}

export enum Premium {
    PREMIUM_30 = 'Premium 30',
    PREMIUM_50 = 'Premium 50',
    PREMIUM_100 = 'Premium 100'
}
