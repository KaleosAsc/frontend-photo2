import  axios from 'axios';
const API_URL = process.env.REACT_APP_API_BASE;
const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,  // Si estás utilizando cookies o credenciales
    // headers: {
    //    'Authorization': `Bearer ${localStorage.getItem('acces_token')}`  // Si estás usando un token JWT
    // }
 });

axiosInstance.interceptors.response.use(
   response => {
       // Suponiendo que el ID del usuario está en la respuesta
       if (response.data.user_id) {
           localStorage.setItem('user_id', response.data.user_id);
           var allCookies = document.cookie;
           console.log(allCookies.access_token);
       }
       return response; // Asegúrate de devolver la respuesta para que el flujo continúe
   },
   error => {
       console.error('Error en la solicitud:', error);
       return Promise.reject(error);
   }
);

export default axiosInstance;