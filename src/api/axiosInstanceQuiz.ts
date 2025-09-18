import axios from 'axios';
import { loadingInterceptor } from './interceptors/loadingInterceptor';

const END_POINT = import.meta.env.VITE_BE_ENDPOINT;

const axiosInstance = axios.create({
  baseURL: END_POINT,  // 共通のAPIエンドポイント
  timeout: 20000,                      // タイムアウト時間 (ミリ秒)
  headers: {
    'Content-Type': 'application/json'
  }
});

// リクエスト時の共通処理
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`);
    loadingInterceptor.increment();
    return config;
  },
  (error) => {
    console.error('[Request Error]', error);
    loadingInterceptor.decrement();
    return Promise.reject(error);
  }
);

// レスポンス時の共通処理
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`[Response] ${response.status} ${response.config.url}`);
    loadingInterceptor.decrement();
    return response;
  },
  (error) => {
    console.error('[Response Error]', error.response ? error.response.data : error);
    loadingInterceptor.decrement();
    return Promise.reject(error);
  }
);

export default axiosInstance;