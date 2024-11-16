import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE;

// Crear instancia de Axios
const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// Interceptor de request para incluir el Bearer token
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access'); // Recuperar el token de acceso
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Incluir el token en el encabezado Authorization
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Interceptor de response para manejar user_id y access token
axiosInstance.interceptors.response.use(
    response => {
        // Guardar el user_id si está presente en la respuesta
        if (response.data.user_id) {
            localStorage.setItem('user_id', response.data.user_id);
        }
        // Guardar el token de acceso si está presente en la respuesta
        if (response.data.access) {
            localStorage.setItem('access', response.data.access);
        }
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
