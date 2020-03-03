export const composeAlbumImagePath = (albumLocation: string, albumSlug: string) => {
    return `/uploads/albums/${albumLocation}/thumb/${albumSlug}.jpg`;
};
