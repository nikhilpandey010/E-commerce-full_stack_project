import {jwtDecode} from 'jwt-decode';
import { getRefreshToken } from '../redux/slices/userSlice.jsx';
import { useDispatch } from 'react-redux';


 
export const setupTokenRefreshTimer = (store) => {
   
  const checkTokenExpiry = () => {
    const { userDetails } = store.getState().user;
    console.log("hellllllllllo",userDetails)
    if (userDetails && userDetails.token) {
        const accessToken = userDetails.token;
        const refresh= userDetails.refresh;
      const decoded = jwtDecode(accessToken); // Use jwt-decode library
      const expiresIn = (decoded.exp * 1000) - Date.now();
      
      // Refresh token 5 minutes before expiry
      if (expiresIn < 300000) { // 5 minutes in ms
        store.dispatch(getRefreshToken(refresh));
      }
    }
  };

  // Check every minute
  setInterval(checkTokenExpiry, 60000);
  checkTokenExpiry(); // Initial check
};

