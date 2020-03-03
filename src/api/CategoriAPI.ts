import axios, { AxiosResponse } from 'axios';
import { API_FETCH_CATEGORIES } from './apis';
import { Category } from '../models';

interface CategoriesResponse {
    categories: Category[];
}

export const apiFetchCategories = async() => {
    const result: AxiosResponse<CategoriesResponse> = await axios(API_FETCH_CATEGORIES);
    return result.data.categories;
};
