
import productAPI from "../../mocks/product";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchProductList = createAsyncThunk(
//   'product/fetchProductList',
//   async ({ keyword, pageNumber }, thunkAPI) => {
//     try {
//       const response = await productAPI.getProductList(keyword, pageNumber);
//       return response;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data.detail || error.message);
//     }
//   }
// );

const initialState={
    productList: {products:[],loading:false ,error:null,page:0 , pages:0},
    productDetails:{product:{reviews:[]},loading:false,error:null},
    createReview:{loading:false,error:null,success:false},
    topRatedProducts:{products:[],loading:false,error:null},
    buyNowProduct:{product:{},loading:false,error:null},
}

const ProductSlice = createSlice(
    {
        name:"product",
        initialState,
        reducers:{
            productListRequest(state)
            {
                state.productList.loading= true;
                state.productList.error = null;
            },
            productListSuccess(state,action)
            {
                // console.log(action.payload.products);
                state.productList.loading=false;
                // console.log("nikhil pandey")
                state.productList.products=action.payload.products;
                state.productList.page=action.payload.page;
                state.productList.pages = action.payload.pages;
                

            },
            productListFailure(state,action)
            {
                state.productList.loading=false;
                state.productList.error=action.payload;
                

            },
            productDetailsRequest(state)
            {
                state.productDetails.loading=true;
                state.productDetails.error=null;


            },
            productDetailsSuccess(state,action)
            {
                console.log("Product details fetched successfully:", action.payload);
                state.productDetails.loading=false;
                state.productDetails.product=action.payload;
                

            },
           
            productDetailsFailure(state,action)
            {
                state.productDetails.loading=false;
                state.productDetails.error=action.payload;


            },
            createReviewRequest(state)
            {
                state.createReview.loading=true;
                state.createReview.error=null;


            },
            createtReviewSuccess(state)
            {
                state.createReview.loading=false;
                state.createReview.success=true;



            },
            createReviewFailure(state,action)
            {
                console.log(action.payload)
                state.createReview.loading=false;
                state.createReview.error=action.payload;


            },
            productTopRequest(state)
            {
                state.topRatedProducts.loading=true;
                state.topRatedProducts.error=null;


            },
            productTopSucess(state,action)
            {
                state.topRatedProducts.loading=false;
                state.topRatedProducts.products=action.payload;


            },
            productTopFailure(state,action)
            {
                state.topRatedProducts.loading=false;
                state.topRatedProducts.error=action.payload;


            },
            buyNowProductRequest(state)
            {
                state.buyNowProduct.loading=true;
                state.buyNowProduct.error=null;
            },
            buyNowProductSuccess(state,action)
            {
                state.buyNowProduct.loading=false;
                state.buyNowProduct.product=action.payload;
            },
            buyNowProductEmpty(state,action)
            {
                state.buyNowProduct.loading=false;
                state.buyNowProduct.product={};
                
            }



        },
        // extraReducers: (builder) => {
        //     builder
        //     .addCase(fetchProductList.pending, (state) => {
        //         state.productList.loading = true;
        //         state.productList.error = null;
        //     })
        //     .addCase(fetchProductList.fulfilled, (state, action) => {
        //         state.productList.loading = false;
        //         state.productList.products = action.payload.products;
        //         state.productList.page = action.payload.page;
        //         state.productList.pages = action.payload.pages;
        //     })
        //     .addCase(fetchProductList.rejected, (state, action) => {
        //         state.productList.loading = false;
        //         state.productList.error = action.payload;
        //     });
        // },

    }
)

export const{
    productListRequest,productListSuccess,productListFailure,
    productDetailsFailure,productDetailsRequest,productDetailsSuccess,
    createReviewFailure,createReviewRequest,createtReviewSuccess,
    productTopRequest,productTopSucess,productTopFailure,buyNowProductEmpty,buyNowProductRequest,buyNowProductSuccess
} =ProductSlice.actions;

export const fetchProductList = (keyword,pageNumber)=>async(dispatch)=>{
    try {
        dispatch(productListRequest());
        // console.log(keyword,pageNumber,".........")

        const productList= await productAPI.getProductList(keyword,pageNumber);

        // console.log(productList,"37399")
        dispatch(productListSuccess(productList));
    } catch (error) {
        dispatch(productListFailure(error.response?.data.detail || error.message));
        
    }
}
export const fetchProductByCategory = (category,pageNumber)=>async(dispatch)=>{
    
    try {
        dispatch(productListRequest());
        const productList= await productAPI.getProductListByCategory(category,pageNumber);
        console.log(productList)
        dispatch(productListSuccess(productList));
    } catch (error) {
        dispatch(productListFailure(error.response?.data.detail || error.message));
        
    }
}





export const fetchProductDetails= (id)=>async(dispatch)=>{
    try {
        console.log("fetchProductDetails called with id:", id);
        dispatch(productDetailsRequest());
        const productDetails = await productAPI.getProductDetails(id);
        console.log("___________+++")
        console.log(productDetails);
        dispatch(productDetailsSuccess(productDetails));
    } catch (error) {
        dispatch(productDetailsFailure(error.response?.data.detail || error.message));
        
    }
}

export const createReview = (productId,review)=>async(dispatch)=>{
    try {
        dispatch(createReviewRequest());
        await productAPI.createProductReview(productId,review);
        dispatch(createtReviewSuccess());
    } catch (error) {
        dispatch(createReviewFailure(error.response?.data.detail || error.message));
        
    }
}

export const fetchTopRatedProducts = ()=>async(dispatch)=>{
    try {
        dispatch(productTopRequest());
        const topProducts=await productAPI.getTopProducts();
        dispatch(productTopSucess(topProducts));
    } catch (error) {
        dispatch(productTopFailure(error.response?.data.detail || error.message));
        
    }
}


export const buyNowProduct = (product)=>async(dispatch)=>{
    
        console.log("buyNowProduct called with product:", product);
        dispatch(buyNowProductRequest());
        
        dispatch(buyNowProductSuccess(product));
    
        
        
    }



export default ProductSlice.reducer;


 // "proxy": "http://127.0.0.1:8000/",