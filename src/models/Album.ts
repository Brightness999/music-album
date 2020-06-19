import { Category } from './Category';
import { Artist } from './Artist';
import { Publisher } from './Publisher';

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
    created_at: string;
    top_album: number;
    vinyl_album: number;
    bandcamp_album: number;
}
