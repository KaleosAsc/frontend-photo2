import axios from './apiService';
const API_URL =  process.env.REACT_APP_API_URL_INTERACTION;


export const getInteraction = async () => {
   try {
       const response = await axios.get(`${API_URL}`);
       return response.data; // Devuelve los datos obtenidos
   } catch (error) {
       console.error('Error fetching data:', error);
       throw error; // Propaga el error
   }
};

export const postInteraction = async (data) => {
   try {
       const response = await axios.post(`${API_URL}`,data);
       return response.data; // Devuelve los datos obtenidos
   } catch (error) {
       console.error('Error fetching data:', error);
       throw error; // Propaga el error
   }
};

export const putInteraction = async (id,data) => {
   try {
       const response = await axios.put(`${API_URL}/${id}`,data);
       return response.data; // Devuelve los datos obtenidos
   } catch (error) {
       console.error('Error fetching data:', error);
       throw error; // Propaga el error
   }
};


export const deleteInteraction = async (id) => {
   try {
       const response = await axios.delete(`${API_URL}/${id}`);
       return response.data; // Devuelve los datos obtenidos
   } catch (error) {
       console.error('Error fetching data:', error);
       throw error; // Propaga el error
   }
};