import axios from 'axios';
import { API_BASE_URL } from './config';

const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000
});

// 响应拦截器：统一处理返回格式
service.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

/**
 * 获取 5G 性能详细信息 (ccinfo)
 * GET /ccinfo
 */
export const getCCInfo = () => {
  return service.get('/ccinfo');
};

export default service;
