export interface Artist {
    id: number;
    name: string;
    slug: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
}

export interface Publisher {
    id: number;
    name: string;
}

export interface Album {
    id: number;
    title: string;
    slug: string;
    location: string;
    catalog: string;
    release_date: string;
    categories: Category[];
    artist: Artist;
    publisher: Publisher;
}

export interface Track {
    id: number;
    title: string;
    location: string;
    duration: number;
    slug: string;
    album: Album;
    category: Category;
    artist: Artist;
}