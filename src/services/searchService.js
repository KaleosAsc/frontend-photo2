import axios from './apiService';
const API_URL_USERNAME_SEARCH = process.env.REACT_APP_API_URL_SEARCH;
class UserService {
    // Método para buscar nombres de usuario por query
    async searchUsernames(query) {
        if (!query) {
            throw new Error("Se requiere un parámetro de búsqueda");
        }
        try {
            const response = await axios.get(`${API_URL_USERNAME_SEARCH}`, {
                params: { query: query }
            });
            return response.data.usernames; // Devuelve la lista de nombres de usuario
        } catch (error) {
            console.error("Error searching usernames:", error);
            throw error; // Propaga el error para ser manejado donde se llame a este servicio
        }
    }
}
export default new UserService();