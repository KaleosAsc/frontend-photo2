import axios from './apiService';
const API_URL_RATING_ESTIMATE = process.env.REACT_APP_API_URL_ESTIMATE_RATING;

class starService {
    async estimateRating(postId) {
        if (!postId) {
            throw new Error("postId is required");
        }
        try {
            const response = await axios.get(`${API_URL_RATING_ESTIMATE}${postId}/`);
            return response.data;
        } catch (error) {
            console.error("Error fetching estimated rating:", error);
            throw error;
        }
    }
}


export default new starService();