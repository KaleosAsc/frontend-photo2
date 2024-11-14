import axios from './apiService';
const API_URL_RATING_ESTIMATE = process.env.REACT_APP_API_URL_ESTIMATE_RATING;

class PostService {
    // Método para obtener la calificación estimada
    async estimateRating(postId) {
        if (!postId) {
            throw new Error("postId is required");
        }

        try {
            const response = await axios.get(`${API_URL_RATING_ESTIMATE}${postId}/`);
            return response.data; // Devuelve la calificación estimada
        } catch (error) {
            console.error("Error fetching estimated rating:", error);
            throw error; // Propaga el error para ser manejado donde se llame a este servicio
        }
    }
    
}

export default new PostService();
