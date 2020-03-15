import {Premium} from "./types";

export const scrollbarStyles = {
    borderRadius: 5
};

export const albumCountPerPage = 20;
export const trackCountPerPage = 15;

export const premiums = [
    {
        premium: Premium.PREMIUM_30,
        dayLimit: 30,
        downloadPerDay: 30,
        price: 20,
        link: 'https://some-host.com/some-link-1'
    },
    {
        premium: Premium.PREMIUM_50,
        dayLimit: 30,
        downloadPerDay: 50,
        price: 30,
        link: 'https://some-host.com/some-link-2'
    },
    {
        premium: Premium.PREMIUM_100,
        dayLimit: 30,
        downloadPerDay: 100,
        price: 45,
        link: 'https://some-host.com/some-link-3'
    }
];