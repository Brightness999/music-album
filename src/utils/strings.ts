export const formatDuration = (length: number): string => {
    let sec_num = Math.ceil(length / 1000);
    let hours   = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);
    if (hours > 0) {
        return hours + ':' + minutes + ':' + seconds;
    }
    if (minutes > 0) {
        return minutes + ':' + seconds;
    }
    return '' + seconds;
};

export const formatFilesize = (file_size: number): string => {
    if (file_size === undefined || file_size === -1) {
        return "NaN";
    }
    return Math.floor(file_size / (1024*1024)) + " Mb";
};

export const formatSimpleDate = (date: Date): string => {
    return new Date(date).toDateString().substr(4);
};