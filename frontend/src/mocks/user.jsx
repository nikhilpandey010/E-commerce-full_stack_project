import axios from  "axios";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

class UserAPI{
    async getUserDetails()
    {
        try {
            const token = Json.parse(localStorage.getItem("userInfo")).token;

            const config ={
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            };

            const {data} = await axios.get(`/app1/users/profile/`,config);
            return data ;
         } 
         catch(error)
         {
            throw error.response && error.response.data.details ? error.response.data.details 
            : error.message;

         }
        
    }

    async login(email, password)
    {
        try {
           const {data} = await axios.post(`${API_BASE_URL}/app1/users/login/` ,{username:email ,password:password}) ;
           return data;
        } catch (error) {
            throw error.response && error.response.data.details ? error.response.data.details 
            : error.message;
        }
    }

    async  Register(userdetails)
    {
        try{
        const {data} = await axios.post(`${API_BASE_URL}/app1/users/register`,userdetails);
            return data;
        } catch (error){
              throw error.response && error.response.data.details ? error.response.data.details 
            : error.message;
        }
    }

     async  fetchRefreshToken(refresh)
    {
        try{
            console.log(refresh,"refreshToken");
        const {data} = await axios.post(`${API_BASE_URL}/app1/users/refresh/`, {refresh: refresh});
            console.log(data,"access");
            return  data.access;
        } catch (error){
              throw error.response && error.response.data.details ? error.response.data.details 
            : error.message;
        }
    }
    
}

const userAPI = new UserAPI();
 
export default userAPI;