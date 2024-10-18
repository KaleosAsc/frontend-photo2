import axios from 'axios';
const API_URL = "http://127.0.0.1:8000/api/user/";
const API_URL_TOKEN_ACCESS = "http://127.0.0.1:8000/api/token/";
const API_URL_TOKEN_REFRESH = "http://127.0.0.1:8000/api/user/";

export const getUsers = async () => {
   try {
       const response = await axios.get(`${API_URL}`);
       return response.data; // Devuelve los datos obtenidos
   } catch (error) {
       console.error('Error fetching data:', error);
       throw error; // Propaga el error
   }
};

export const postUsers = async (data) => {
   try {
       const response = await axios.get(`${API_URL}`,data);
       return response.data; // Devuelve los datos obtenidos
   } catch (error) {
       console.error('Error fetching data:', error);
       throw error; // Propaga el error
   }
};

export const putUsers = async (id,data) => {
   try {
       const response = await axios.put(`${API_URL}/${id}`,data);
       return response.data; // Devuelve los datos obtenidos
   } catch (error) {
       console.error('Error fetching data:', error);
       throw error; // Propaga el error
   }
};

export const deleteUsers = async (id) => {
   try {
       const response = await axios.delete(`${API_URL}/${id}`);
       return response.data; // Devuelve los datos obtenidos
   } catch (error) {
       console.error('Error fetching data:', error);
       throw error; // Propaga el error
   }
};