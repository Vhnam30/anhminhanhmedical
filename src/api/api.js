import axios from 'axios';

// Ưu tiên lấy từ biến môi trường, nếu không có sẽ tự động trỏ về Render
const API_URL = process.env.REACT_APP_API_URL || 'https://anhminhanhmedical-backend.onrender.com';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Cực kỳ quan trọng để gửi/nhận cookie cross-site
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor tự động gắn Token vào Header cho mỗi Request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const api = {
  // --- AUTH API ---
  login: (credentials) => axiosInstance.post('/api/auth/login', credentials),
  register: (userData) => axiosInstance.post('/api/auth/register', userData),
  getProfile: () => axiosInstance.get('/api/auth/me'),

  // --- PRODUCT API ---
  getProducts: () => axiosInstance.get('/api/products'),
  
  getProductDetail: (slug) => axiosInstance.get(`/api/product-details/${slug}`),
  
  saveProductDetail: (slug, formData) => 
    axiosInstance.post(`/api/product-details/${slug}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  
  // Bạn có thể thêm các API khác ở đây...
};

export { axiosInstance };
export default api;