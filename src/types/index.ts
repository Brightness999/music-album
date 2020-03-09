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
}
