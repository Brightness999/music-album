import {Premium} from "./types";

export const scrollbarStyles = {
    borderRadius: 5
};

export const albumCountPerPage = 40;
export const trackCountPerPage = 50;

export const previewLength = 150;

export const premiums = [
    {
        premium: Premium.PREMIUM_30,
        dayLimit: 30,
        downloadPerDay: 30,
        specialDownloadPerDay: 1,
        price: 14.95,
        link: 'http://tiny.cc/premium30'
    },
    {
        premium: Premium.PREMIUM_50,
        dayLimit: 30,
        downloadPerDay: 50,
        specialDownloadPerDay: 3,
        price: 19.95,
        link: 'http://tiny.cc/premium50'
    },
    {
        premium: Premium.PREMIUM_100,
        dayLimit: 30,
        downloadPerDay: 100,
        specialDownloadPerDay: 5,
        price: 29.95,
        link: 'http://tiny.cc/premium100'
    }
];
