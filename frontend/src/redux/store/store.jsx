// import { useDispatch as useReduxDispatch ,useSelector as useReduxSelector} from "react-redux";
import { configureStore} from "@reduxjs/toolkit";
import  productReducer  from "../slices/productSlice";
import userReducer from "../slices/userSlice"
import cartReducer from "../slices/cartSlice"
import paymentReducer from '../slices/paymentSlice'
import orderReducer from '../slices/orderSlice';

const Store = configureStore({
    reducer:{
        product:productReducer,
        user:userReducer,
        cart:cartReducer,
        payment:paymentReducer,
        order:orderReducer
        
    },
});


export default Store;