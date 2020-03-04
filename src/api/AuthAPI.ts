import axios, { AxiosResponse } from 'axios';

import { API_LOGIN } from './apis';
import { environment } from '../environments/envrionment';

interface LoginResponse {
    result: number;
    token: string;
}

export const apiLogin = async (id: string, password: string) => {
    const result: AxiosResponse<LoginResponse> = await axios.post(environment.API_URL + API_LOGIN, {id: id, password: password});
    return result.data;
};
