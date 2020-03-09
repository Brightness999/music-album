import axios, { AxiosResponse } from 'axios';

import { API_FETCH_USER_INFO, API_LOGIN } from './apis';
import { environment } from '../environments/envrionment';
import { UserInfo } from '../types';

interface LoginResponse {
    result_code: number;
    token: string;
}

interface UserInfoResponse {
    result_code: number;
    user_info : UserInfo;
}

export const apiLogin = async (id: string, password: string) => {
    const result: AxiosResponse<LoginResponse> = await axios.post(environment.API_URL + API_LOGIN, {email: id, password: password});
    return [result.data.result_code, result.data.token];
};

export const apiFetchUserInfo = async () => {
    const token = localStorage.getItem('token');
    const result: AxiosResponse<UserInfoResponse> = await axios.get(environment.API_URL + API_FETCH_USER_INFO + '?token='+token);
    return [result.data.result_code, result.data.user_info];
};
