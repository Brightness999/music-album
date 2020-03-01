export interface IArtist {
    id: number;
    name: string;
    slug: string;
}

export interface IAlbum {
    title: string;
    slug: string;
    location: string;
    catalog: string;
    artist: IArtist;
}
