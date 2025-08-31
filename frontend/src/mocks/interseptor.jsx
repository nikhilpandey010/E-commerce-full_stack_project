// import axios from 'axios';
// import { logout, refreshToken } from '../redux/slices/userSlice';
// import store from '../redux/store';

// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = store.getState().user.accessToken;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
    
//     // If 401 and not already retried
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
      
//       try {
//         // Attempt to refresh token
//         await store.dispatch(refreshToken());
//         const newToken = store.getState().user.accessToken;
        
//         // Retry original request with new token
//         originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         // If refresh fails, logout user
//         store.dispatch(logout());
//         return Promise.reject(refreshError);
//       }
//     }
    
//     return Promise.reject(error);
//   }
// );

// export default api;