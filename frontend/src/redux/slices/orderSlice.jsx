import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";
import orderAPI from "../../mocks/order";

export const createMainOrder = createAsyncThunk(
  'order/createMainOrder',
  async (orderData, thunkAPI) => {
    const data = await orderAPI.createOrder(orderData);
    return data;
  }
);


const initialState ={
    listOrder:[],
    orderDetails:{},
    loading: false,
    error:null,
};

const orderSlice = createSlice({
    name:"order",
    initialState,
    reducers:
    {
        getOrderDetailsStart(state){
            state.loading = true;
            state.error = null;

        },
        getOrderDetailsSuccess(state,action){
            state.loading = false;
            state.orderDetails= action.payload;
            state.error = null;
            console.log(action.payload);
            
        },

        getOrderDetailsFailure(state,action){
            state.loading = false;
            
            state.error = action.payload;
          
            
        },
        // createOrderStart(state)
        // {
            
        //    state.loading=true;
        //     state.error = null ;
        // },
        // createOrderSuccess(state,action)
        // {
            
        //     state.listOrder.push(action.payload);
        //     state.orderDetails = action.payload;
        //     state.loading= false ;
        //     state.error = null ;
        //     console.log(state,action)
        // },
        // createOrderFailure(state,action)
        // {
            
        //     state.loading=false;
        //     state.error = action.payload;
        // },


        payOrderStart(state)
        {
            
            state.loading=true;
            state.error = null ;
        },

        payOrderSuccess(state,action)
        {
            if(action.payload === 'order was paid');
            {
                state.orderDetails.isPaid =true;
            }

            state.loading = false;
               
        },

        payOrderFailure(state,action)
        {
            state.loading = false ;
            state.error = action.payload ;
        },
        listMyOrderStart(state)
        {
            state.loading=true;
            state.error=null;

        },
        listMyOrderSuccess(state,action)
        {
            console.log(action.payload)
            state.listOrder = action.payload;
            state.loading=false;
            state.error=null;
        },
        listMyOrderFailure(state,action)
        {
            state.loading=false;
            state.error=action.payload;
        },
        deliverOrderStart(state)
        {
           
            state.loading=true;
            state.error=null;
        },
        deliverOrderSuccess(state,action)
        {
            updatedOrder = action.payload;
            const index = state.listOrder.findIndex((order)=>order._id ===updatedOrder._id);
           if(index != -1)
           {
            state.listOrder[index]= updatedOrder;
           }
            state.loading=false;
            state.error=null;
        },
        deliverOrderFailure(state,action)
        {
           
            state.loading=false;
            state.error=action.payload;
        },
        


    },
    extraReducers: (builder) => {
    builder
      .addCase(createMainOrder.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(createMainOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
        state.listOrder.push(action.payload);
      })
      .addCase(createMainOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});



export const {
    getOrderDetailsFailure,getOrderDetailsStart,getOrderDetailsSuccess,
    // createOrderFailure,createOrderStart,createOrderSuccess,
    payOrderFailure,payOrderStart,payOrderSuccess,listMyOrderFailure,listMyOrderStart,
    listMyOrderSuccess,deliverOrderFailure,deliverOrderStart,deliverOrderSuccess
} = orderSlice.actions;



export const createSingleOrder =(order)  => async(dispatch)=>{
    try {
        dispatch(createOrderStart());
        const createOrder = await orderAPI.createOrder(order);
        console.log("createOrder",createOrder);
        dispatch(createOrderSuccess(createOrder));
        
    } catch (error) {
        dispatch(createOrderFailure(error.message));
        
    }
}

export const getOrderDetails =(orderId)  => async(dispatch)=>{
    try {
        console.log("get order details ",orderId);
        dispatch((getOrderDetailsStart()));
        const orderDetails = await orderAPI.fetchOrderDetails(orderId);
        console.log(orderId,orderDetails)
        dispatch(getOrderDetailsSuccess(orderDetails));
        
    } catch (error) {
        dispatch(getOrderDetailsFailure(error.message));
        
    }
};

export const payOrder=(orderId,paymentResult)  => async(dispatch)=>{
    try {
        dispatch(createOrderStart());
        const updateOrder = await orderAPI.payOrder(orderId,paymentResult);
        dispatch(payOrderSuccess(updateOrder));
        
    } catch (error) {
        dispatch(payOrderFailure(error.message));
        
    }
};

export const listMyOrders =()  => async(dispatch)=>{
    try {
        dispatch(listMyOrderStart());
        const myOrder = await orderAPI.listMyOrder();
        console.log("my order ",myOrder);
        dispatch(listMyOrderSuccess(myOrder));
        
    } catch (error) {
        dispatch(listMyOrderFailure(error.message));
        
    }
};


export const deliverorder =(orderId)  => async(dispatch)=>{
    try {
        dispatch(deliverOrderStart());
        const updateOrder = await orderAPI.delevierOrder(orderId);
        dispatch(deliverOrderSuccess(updateOrder));
        
    } catch (error) {
        dispatch(deliverOrderFailure(error.message));
        
    }
};


export default orderSlice.reducer; 




