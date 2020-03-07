import axios, { AxiosResponse } from 'axios';

import { API_LOGIN } from './apis';
import { environment } from '../environments/envrionment';

interface LoginResponse {
    result_code: number;
    token: string;
}

export const apiLogin = async (id: string, password: string) => {
    const result: AxiosResponse<LoginResponse> = await axios.post(environment.API_URL + API_LOGIN, {email: id, password: password});
    return [result.data.result_code, result.data.token];
};
