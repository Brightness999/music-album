import axios, { AxiosResponse } from 'axios';
import { API_FETCH_CATEGORIES } from './apis';
import { Category } from '../models';
import { environment } from '../environments/envrionment';

interface CategoriesResponse {
    categories: Category[];
}

export const apiFetchCategories = async() => {
    const result: AxiosResponse<CategoriesResponse> = await axios(environment.API_URL + API_FETCH_CATEGORIES);
    return result.data.categories;
};
