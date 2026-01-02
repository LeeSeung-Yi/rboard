//api.js

/*
/*백엔드와 프론트가 연결하는 출입구
*/
import axios from "axios";
import { clearAuth, getToken } from "./authApi";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

//request interceptor: 서버로 나가는 모든 요청에 jwt 자동 추가
api.interceptors.request.use((config) => {
    const token = getToken();
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

//response interceptor
api.interceptors.response.use(
    (response) => response, //200번대 성공
    (error) => {
        if(error.response?.status === 401) {clearAuth();
        //현재 로그인 페이지가 아니면 리다이렉트
        if(!window.location.pathname.includes('/auth/login')) {
            window.location.href = '/auth/login';
        }
    }
        return Promise.reject(error);
    }
);