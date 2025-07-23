import { createSlice } from "@reduxjs/toolkit";
import cartAPI from "../../mocks/cart";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]"),
        setPaymentMethod:{},
        shippingAddress:JSON.parse(localStorage.getItem("shippingAddress") || "{}") ,

    },

    reducers:{
        setCartItems(state, action){
            state.cartItems = action.payload;
            console.log("hwhwhwhw",state.cartItems);

            localStorage.setItem("cartItems",JSON.stringify(action.payload));


        },

        removeCartItem(state,action)
        {
            const id = action.payload;
            state.cartItems =  state.cartItems.filter((key)=> key._id != id);
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems));


        },

        setShippingAddress(state, action)
        {
            console.log(action.payload)
            localStorage.setItem("shippingAddress",JSON.stringify(action.payload));
            state.shippingAddress=action.payload
        },

        // setPaymentMethod(state,action)
        // {
        //     state.setPaymentMethod=action.payload;
        //     localStorage.setItem("paymentMethod",JSON.stringify(action.payload));

        // },
    
    }
})

export const{
    setCartItems ,
    removeCartItem,
    setShippingAddress,
    // setPaymentMethod
}  = cartSlice.actions;

export const addTocart =(id,qty ) => async (dispatch , getState) =>{
    try {
        console.log("addTocart called with id:",id," and qty:",qty);
        console.log("id",typeof(id))
        const {cartItems} = getState().cart;
        const product = await cartAPI.fetchProduct(id);
        console.log("product",product)
        console.log("cartItems",cartItems);
        

        const existingItem = cartItems.find(item => item._id === product._id);

        if (existingItem) {
        const updatedCartItems = cartItems.map(item =>
            item._id === product._id ? { ...item, qty: qty } : item
        );
        dispatch(setCartItems(updatedCartItems));
        } else {
        dispatch(setCartItems([...cartItems, { ...product, qty }]));
        }

    } catch (error) {
        console.log("Error adding item to cart ",error);
        
    }
}

export const removeFromCart =(id) =>(dispatch) =>{
    try {
        dispatch(removeCartItem(id));
       
        
    } catch (error) {
        console.log("Error removing item from cart ");
    }
};


export const saveShippingAddress =(data) =>(dispatch) =>{
    
        dispatch(setShippingAddress(data));
       
};

// export const savePaymentMethod = (data) =>(dispatch) =>{
//     dispatch(setPaymentMethod(data));
// };

export default cartSlice.reducer;