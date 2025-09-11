import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

class CartAPI{
    
    async fetchProduct(productId)
    {
        try {
            // const {data} = await axios.get(`http://127.0.0.1:8000/app1/products/${productId}`);
            const {data} = await axios.get(`${API_BASE_URL}/app1/products/${productId}`);

            return data;
        } catch (error) {
            throw error;
            
        }
    }
}

const cartAPI = new CartAPI();

export default cartAPI;