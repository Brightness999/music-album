import {Album} from "./Album";
import {Category} from "./Category";
import {Artist} from "./Artist";

export interface Track {
    id: number;
    title: string;
    location: string;
    slug: string;
    filesize: number;
    duration: number;
    album: Album;
    category: Category;
    artist: Artist;
}
