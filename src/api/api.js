import axios from 'axios'; 
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


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
  getProducts: () => axiosInstance.get('/api/products'),
  
  getProductDetail: (slug) => axiosInstance.get(`/api/product-details/${slug}`),
  
  saveProductDetail: (slug, formData) => 
    axiosInstance.post(`/api/product-details/${slug}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  
  // Thêm các API khác sau...
};

export default api;