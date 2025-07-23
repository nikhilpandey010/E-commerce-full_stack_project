import { createSlice } from "@reduxjs/toolkit";
import userAPI from "../../mocks/user";

const storedUserInfo = localStorage.getItem("userInfo");

const initialState={
    userDetails: storedUserInfo ? JSON.parse(storedUserInfo) : null ,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        loginStart(state)
        {
            state.loading = true;
            state.error = null;

        },
        loginSucess(state,action)
        {
            state.userDetails= action.payload;
            state.loading = false;
            console.log(action.payload)
            localStorage.setItem("userInfo" , JSON.stringify(action.payload));

        },
        loginFailure(state ,action)
        {
            state.loading = false;
            state.error = action.payload;
        },
        getUserDetailsStart(state)
        {
            state.loading=true;
            state.error= null;
        },
        getUserDetailsSucess(state,action)
        {
            state.userDetails=action.payload;
            state.loading = false;
            state.error =  null;

        },
        getUserDetailsFailure(state , action)
        {
            state.error = false;
            state.error =  action.payload;
        },
        createUserStart(state)
        {
            state.loading = true;
            state.error = null;
        },
        createUserSucess(state, action)
        {
            console.log(action.payload)
            state.userDetails= {...action.payload};
            state.loading=false;
            state.error = null;
            // localStorage.setItem("userInfo",JSON.stringify(action.payload));

        },
        createUserFailure(state,action)
        {
            state.loading=false;
            state.error = action.payload;
        },
        // updateUserStart(state)
        // {
        //     state.loading = true;
        //     state.error = null;
        // },
        // updateUserSucess(state,action)
        // {
        //     state.userDetails = {...state.userDetails,...action.payload}
        //     state.loading = false;
        //     state.error = null;
        //     localStorage.setItem("userInfo",JSON.stringify(state.userDetails));
        // },
        // updateUserFailure(state,action)
        // {
        //     state.loading = false;
        //     state.error = action.payload;
        // },
        // deleteUserStart(state)
        // {
        //     state.loading=true;
        //     state.error = null;
        // },
        // deleteUserSucess(state,action)
        // {
        //     state.userDetails={};
        //     state.loading=false;
        //     state.error = null;
        //     localStorage.removeItem("userInfo");
        // },
        // deleteUserFailure(state,action)
        // {
        //     state.loading=false;
        //     state.error = action.payload;
        // },
        // logoutSucess(state)
        // {
        //     state.userDetails={};
        //     state.loading= false;
        //     state.error=null;
        //     localStorage.removeItem("userInfo");
        // }

    }
})

export const {
    loginStart, loginSucess,loginFailure ,getUserDetailsSucess,getUserDetailsStart,getUserDetailsFailure,
    createUserFailure,createUserStart,createUserSucess,
    updateUserFailure,updateUserStart,updateUserSucess,deleteUserStart,deleteUserFailure,deleteUserSucess,logoutSucess
} =userSlice.actions;

export const login = (email,password) => async (dispatch) =>{
    try {
        console.log(email,password);
        dispatch(loginStart());
        const user=await userAPI.login(email,password);
        console.log(user)
        dispatch(loginSucess(user))
    } catch (error) {
       dispatch(loginFailure(error.message)) ;
    }
}

export const fetchUserDetails = (userId)=> async (dispatch) =>{
    try {
        dispatch(getUserDetailsStart());
        const userDetails=await userAPI.getUserDetails(userId);
        dispatch(getUserDetailsSucess(userDetails))
    } catch (error) {
        dispatch(getUserDetailsFailure(error.message));
        
    }
}

// export const createUser =(name , email , password)=> async (dispatch)=>{
    export const createUser =(userDetails)=> async (dispatch)=>{
    try {
        dispatch(createUserStart());
        console.log(userDetails)
        // const user =await userAPI.createUser(name,email,password);
        const user =await userAPI.Register(userDetails);
        console.log(user,"user");
        dispatch(createUserSucess(user));
        // dispatch(loginSucess(user));
        
    } catch (error) {
        dispatch(createUserFailure(error.message));

        
    }
}

export const updateUser =(userId,updateData) => async (dispatch)=>{
    try {
        dispatch(updateUserStart());
        const updateUser =await userAPI.updateUser(userId,updateData);
        dispatch(updateUserSucess(updateUser))
        
    } catch (error) {
        dispatch(updateUserFailure(error.message));
    }
}

export const deleteUser =(userId) => async (dispatch)=>{
    try {
        dispatch(deleteUserStart());
        const deleteUser =await userAPI.deleteUser(userId);
        dispatch(deleteUserSucess(updateUser))
        
    } catch (error) {
        dispatch(deleteUserFailure(error.message));
    }
}

export const logout =() => async (dispatch)=>{
    
        dispatch(logoutSucess());
       
        
    
}

export default userSlice.reducer;