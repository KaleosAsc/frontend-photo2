import axios from 'axios';
import { TbEmpathize } from 'react-icons/tb';
const API_URL =  process.env.REACT_APP_API_URL_INTERACTION;


class InteractionService{
    constructor(id_user){
        this.id_user = id_user;
    }
        async getInteraction () {
        try {
            const response = await axios.get(`${API_URL}`);
            return response.data; // Devuelve los datos obtenidos
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; // Propaga el error
        }
     };
     
     async postInteraction(){
        try {
            const response = await axios.post(`${API_URL}`,data);
            return response.data; // Devuelve los datos obtenidos
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; // Propaga el error
        }
     };
     
     async putInteraction(id, data) {
        try {
            const response = await axios.put(`${API_URL}/${id}`,data);
            return response.data; // Devuelve los datos obtenidos
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; // Propaga el error
        }
     };
     
     
     async deleteInteraction(id){
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data; // Devuelve los datos obtenidos
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; // Propaga el error
        }
     };

}

