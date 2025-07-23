import axios from "axios";

class OrderAPI{
    createOrder = async (order)=>{
        try {
             const token = JSON.parse(localStorage.getItem("userInfo")).token;
            console.log('Token:', token)  // 🔍 Debug: token value
            
            const config ={
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`  // 🔍 Debug: Authorization header,
                }
            };

            const {data} = await axios.post('http://127.0.0.1:8000/app1/orders/add/',order,config);
            return data;
        } catch (error) {
            throw error.response && error.detail ? error.response.detail
            :error.message ;
            
        }
    };

    fetchOrderDetails = async (id)=>{
        try {
            const token = JSON.parse(localStorage.getItem("userInfo")).token;

            const config ={
                headers:{
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const {data} = await axios.get(`http://127.0.0.1:8000/app1/orders/${id}/`,config);
            console.log("get order details ",data);
            return data;
        } catch (error) {
            throw error.response && error.detail ? error.response.detail
            :error.message ;
            
        }
    };

    payOrder = async (id,paymentResult)=>{
        try {
            const token = JSON.parse(localStorage.getItem("userInfo")).token;

            const config ={
                headers:{
                    "Content-type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            };

            const {data} = await axios.put(`http://127.0.0.1:8000/app1/orders/${id}/pay/`,paymentResult,config);
            return data;
        } catch (error) {
            throw error.response && error.detail ? error.response.detail
            :error.message ;
            
        }
    };

    listMyOrder = async ()=>{
        try {
            const token = JSON.parse(localStorage.getItem("userInfo")).token;
             console.log('Token:', token)  
            const config ={
                headers:{
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const {data} = await axios.get('http://127.0.0.1:8000/app1/orders/myorders/',config);
            return data;
        } catch (error) {
            throw error.response && error.detail ? error.response.detail
            :error.message ;
            
        }
    };

    delevierOrder = async (order)=>{
        try {
            const token = JSON.parser(localStorage.getItem("userInfo")).token;

            const config ={
                header:{
                    "Conten-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const {data} = await axios.put(`http://127.0.0.1:8000/app1/orders/${order._id}/deliver/`,{},config);
            return data;
        } catch (error) {
            throw error.response && error.detail ? error.response.detail
            :error.message ;
            
        }
    }
}

const orderAPI = new OrderAPI;
export default orderAPI;