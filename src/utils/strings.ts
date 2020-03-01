export const formatDuration = (length: number): string => {
    let secs = Math.floor(length / 1000);
    const sec = secs % 60;
    secs = Math.floor(secs / 60);
    const min = secs % 60;
    secs = Math.floor(secs / 60);
    const hr = secs / 60;
    if (hr !== 0) {
        return `${hr}:${min}:${sec}`;
    }
    if (min !== 0) {
        return `${min}:${sec}`;
    }
    return `${sec}`;
}

export const formatFilesize = (file_size?: number): string => {
    if (file_size === undefined) {
        return "NaN";
    }
    return Math.floor(file_size / (1024*1024)) + " Mb";
};
