import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

class ProductAPI {

    async getProductList(keyword ,pageNumber)
    {
        // try {
        //     const {data} = await axios.get("http://127.0.0.1:8000/app1/products",{
        //         params:{
        //             keyword: keyword,
        //             page: pageNumber
        //         }
        //     }) ;
         try {
            const {data} = await axios.get(`${API_BASE_URL}/app1/products`,{
                params:{
                    keyword: keyword,
                    page: pageNumber
                }
            }) ;


            return data;

            
        } catch (error) {
            throw error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
            
        }
    }

    async getProductDetails(productId)
    {
        try {
            console.log("8319",productId)
            // const {data} = await axios.get(`http://127.0.0.1:8000/app1/products/${productId}/`);
            const {data} = await axios.get(`${API_BASE_URL}/app1/products/${productId}/`);

            console.log(data)
            return  data;
        } catch (error) {
            throw error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        }
    }
        
    
   

    async createProductReview(productId,review)
    {
        try {
            // const rawToken = JSON.parse(localStorage.getItem("userInfo"))?.token || ""
            // const token = rawToken.replace(/\r?\n|\r/g, "").trim()
            // console.log("Clean token:", token)
            // if (!token) throw new Error("You must be logged in to post a review.")
            const token = JSON.parse(localStorage.getItem("userInfo")).token;
            console.log('Token:', token)  // 🔍 Debug: token value
            
            const config ={
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`  // 🔍 Debug: Authorization header,
                }
            };
            console.log('Axios config headers:', config.headers)  // 🔍 Debug: header structure
            // const {data} = (await axios.post(`http://127.0.0.1:8000/app1/products/${productId}/reviews/`,review,config)).data;
            const {data} = (await axios.post(`${API_BASE_URL}/app1/products/${productId}/reviews/`,review,config)).data;

            console.log(data,".......alphabeta")
            return  data;
        } catch (error) {
            throw error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        }
    }

    async getTopProducts()
    {
        try {
            
            // const {data} = await axios.get("http://127.0.0.1:8000/app1/products/top/");
            const {data} = await axios.get(`${API_BASE_URL}/app1/products/top/`);

            return  data;
        } catch (error) {
            throw error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        }
    }  

    

}

const productAPI = new ProductAPI();

export default productAPI;