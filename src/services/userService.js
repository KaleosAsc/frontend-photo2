import axios from './apiService';

// Definir la URL de las APIs usando variables de entorno
const API_URL = process.env.REACT_APP_API_URL_USER;
const API_URL_TOKEN_ACCESS = process.env.REACT_APP_API_URL_TOKEN_ACCESS;
const API_URL_TOKEN_REFRESH = process.env.REACT_APP_API_URL_TOKEN_REFRESH;
const API_URL_REGISTER = process.env.REACT_APP_API_URL_REGISTER;

class UserService {
    // Método para registrar usuarios
    async registerUsers(data) {
        try {
            const response = await axios.post(`${API_URL_REGISTER}`, data,{
                headers: {
                    'Content-Type': 'application/json', // Asegúrate de que el tipo de contenido sea JSON
                },
                withCredentials: true,
            });
            localStorage.setItem('user_id',response.data.user_id);
            return response.data; // Devuelve los datos obtenidos
        } catch (error) {
            console.error('Error registrando usuario:', error);
            throw error; // Propaga el error
        }
    }

    // Método para iniciar sesión
    async loginUsers(data) {
        try {
            const response = await axios.post(`${API_URL_TOKEN_ACCESS}`, data);
            localStorage.setItem('user_id',response.data.user_id);
            return response.data; // Devuelve los datos obtenidos
        } catch (error) {
            console.error('Error iniciando sesión:', error);
            throw error; // Propaga el error
        }
    }

    // Método para obtener usuarios
    async getUsers(id) {
        if(id){
            try {
                const response = await axios.get(`${API_URL}${id}`);
                console.log("service "+response.data.username)
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
                console.error('Error obteniendo usuarios:', error);
                throw error; // Propaga el error
            }
        }
    }

    // Método para actualizar un usuario
    async putUsers(id, data) {
        try {
            const response = await axios.put(`${API_URL}${id}`, data);
            return response.data; // Devuelve los datos obtenidos
        } catch (error) {
            console.error('Error actualizando usuario:', error);
            throw error; // Propaga el error
        }
    }

    // Método para eliminar un usuario
    async deleteUsers(id) {
        try {
            const response = await axios.delete(`${API_URL}${id}`);
            return response.data; // Devuelve los datos obtenidos
        } catch (error) {
            console.error('Error eliminando usuario:', error);
            console.log('usuario no eliminado: ',id);
            throw error; // Propaga el error
        }
    }
}

// Exporta la clase para usarla en otros archivos
export default new UserService();
