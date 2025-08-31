import axios from  "axios";

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

    // async updateUser(userId,updateData)
    // {
    //     try {
    //         const token = Json.parse(localStorage.getItem("userInfo")).token;
    //         const config ={
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             }
    //         };

    //         const {data}= await axios.put(`/app1/users/profile/update` ,updateData,config);
    //         return data;
            
    //     } catch (error) {
    //         throw error.response && error.response.data.details ? error.response.data.details 
    //         : error.message;
    //     }
    // }

    // async deleteUser(userId)
    // {
    //     try {
    //         const token = Json.parse(localStorage.getItem("userInfo")).token;
    //         const config ={
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             }
    //         };

    //         await axios.delete(`/app1/users/delete/${userId}`,config)
    //     }
    //     catch(error)
    //     {
    //         throw error.response && error.response.data.details ? error.response.data.details 
    //         : error.message;
    //     }

    // }

    async login(email, password)
    {
        try {
           const {data} = await axios.post('http://127.0.0.1:8000/app1/users/login/' ,{username:email ,password:password}) ;
           return data;
        } catch (error) {
            throw error.response && error.response.data.details ? error.response.data.details 
            : error.message;
        }
    }

    async  Register(userdetails)
    {
        try{
        const {data} = await axios.post('http://127.0.0.1:8000/app1/users/register',userdetails);
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
        const {data} = await axios.post('http://127.0.0.1:8000/app1/users/refresh/', {refresh: refresh});
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