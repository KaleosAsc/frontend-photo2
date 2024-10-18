import axios from 'axios';
const API_URL = "http://127.0.0.1:8000/api/user/";

export const getPost = async () => {
   try {
       const response = await axios.get(`${API_URL}/data`);
       return response.data; // Devuelve los datos obtenidos
   } catch (error) {
       console.error('Error fetching data:', error);
       throw error; // Propaga el error
   }
};

export const postPost = async (id) => {
   try {
       const response = await axios.get(`${API_URL}/data`);
       return response.data; // Devuelve los datos obtenidos
   } catch (error) {
       console.error('Error fetching data:', error);
       throw error; // Propaga el error
   }
};

export const putPost = async (id) => {
   try {
       const response = await axios.put(`${API_URL}/data/${id}`,);
       return response.data; // Devuelve los datos obtenidos
   } catch (error) {
       console.error('Error fetching data:', error);
       throw error; // Propaga el error
   }
};


export const deletePost = async (id) => {
   try {
       const response = await axios.put(`${API_URL}/data/id`);
       return response.data; // Devuelve los datos obtenidos
   } catch (error) {
       console.error('Error fetching data:', error);
       throw error; // Propaga el error
   }
};