import axios from './apiService';
const API_URL = process.env.REACT_APP_API_URL_RATING;
class RatingService {
    async updatePostRating(post_id, rating) {
        try {
            const response = await axios.post(`${API_URL}`, { post_id, rating });
            return response.data; // Retorna los datos obtenidos del backend
        } catch (error) {
            console.error('Error updating post rating:', error);
            throw error; // Propaga el error para manejarlo en el componente
        }
    }
}
export default new RatingService();