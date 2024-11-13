import axios from './apiService';
const API_URL =  process.env.REACT_APP_API_URL_POST;

class PostService{
    async getPost(id){
        if(id){
            try {
                const response = await axios.get(`${API_URL}${id}`);
                console.log("publicaciones: "+response.data)
                return response.data; // Devuelve los datos obtenidos
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error; // Propaga el error
            }
        }else{
            try {
                const response = await axios.get(`${API_URL}`);
                return response.data; // Devuelve los datos obtenidos
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error; // Propaga el error
            }
        }
    }
    async postPost(data){
        try {
            const response = await axios.post(`${API_URL}`,data);
            return response.data; // Devuelve los datos obtenidos
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; // Propaga el error
        }
     };

     async postPost(data){
        try {
            const response = await axios.post(`${API_URL}`,data);
            return response.data; // Devuelve los datos obtenidos
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; // Propaga el error
        }
     };
     
     async putPost(id,data) {
        try {
            const response = await axios.put(`${API_URL}${id}`,data);
            return response.data; // Devuelve los datos obtenidos
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; // Propaga el error
        }
     }
     
     async deletePost(id) {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data; // Devuelve los datos obtenidos
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; // Propaga el error
        }
     }
}

export default new PostService();