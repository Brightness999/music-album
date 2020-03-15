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
        link: 'http://tiny.cc/premium30'
    },
    {
        premium: Premium.PREMIUM_50,
        dayLimit: 30,
        downloadPerDay: 50,
        price: 30,
        link: 'http://tiny.cc/premium50'
    },
    {
        premium: Premium.PREMIUM_100,
        dayLimit: 30,
        downloadPerDay: 100,
        price: 45,
        link: 'http://tiny.cc/premium50'
    }
];