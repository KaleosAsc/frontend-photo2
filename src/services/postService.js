import axiosInstance from './apiService';

// Definir la URL de las APIs usando variables de entorno
const API_URL_POST = process.env.REACT_APP_API_URL_POST;

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

class PostService {
    // Método para obtener todos los posts
    async getPosts() {
        try {
            const response = await axiosInstance.get(`${API_URL_POST}`);
            return response.data; // Devuelve los datos obtenidos
        } catch (error) {
            console.error('Error obteniendo posts:', error);
            throw error; // Propaga el error
        }
    }

    // Método para crear un nuevo post
    async createPost(data) {
        try {
            console.log('Cookies recibidas:', document.cookie);
            const response = await axiosInstance.post(`${API_URL_POST}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
            return response.data; // Devuelve los datos obtenidos
        } catch (error) {
            console.error('Error creando el post:', error);
            throw error; // Propaga el error
        }
    }

    // Método para actualizar un post existente
    async updatePost(id, data) {
        try {
            const response = await axiosInstance.put(`${API_URL_POST}/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Para manejar archivos
                },
                withCredentials: true,
            });
            return response.data; // Devuelve los datos obtenidos
        } catch (error) {
            console.error('Error actualizando el post:', error);
            throw error; // Propaga el error
        }
    }

    // Método para eliminar un post
    async deletePost(id) {
        try {
            const response = await axiosInstance.delete(`${API_URL_POST}/${id}`);
            return response.data; // Devuelve los datos obtenidos
        } catch (error) {
            console.error('Error eliminando el post:', error);
            throw error; // Propaga el error
        }
    }
}

// Exporta la clase para usarla en otros archivos
export default new PostService();
