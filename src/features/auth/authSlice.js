
import { createSlice } from "@reduxjs/toolkit";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";

import { auth } from "../../utils/firebase"
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";





export const signupUser = createAsyncThunk("auth/singupUser",
    async({email, password}, {rejectWithValue})=>{
        try{
            const userCredentials = await createUserWithEmailAndPassword(
                auth, 
                email, 
                password
            );

            return userCredentials.user;
        }
        catch(error){
            return rejectWithValue(error.message);
        }
    }

); 


//Login 
export const loginUser = createAsyncThunk("auth/loginUser",
    async({email,password}, {rejectWithValue})=>{

        try {
            const userCredentials = await signInWithEmailAndPassword(
                auth, 
                email, 
                password
            );

            return userCredentials.user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


//Auth Slice 
const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        loading:false,
        error:null,
    },
    reducers:{ 
        logout: (state)=>{
            state.user=null;
        }

    },
    //extraReducers bcoz async operation haii to pending, fullfilled, rejected etc external reducer h 
    extraReducers:(builder)=>{
        builder
        //signUp
         .addCase(signupUser.pending, (state)=>{
            state.loading =true;
         })
         .addCase(signupUser.fulfilled, (state, action)=>{
            state.loading = true;
            state.user = action.payload;
         })
         .addCase(signupUser.rejected, (state, action)=>{
            state.loading=true;
            state.user = action.payload;
         })

         //Login 
         .addCase(loginUser.pending,(state)=>{
            state.loading=true;
         })
         .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload;
         })
         .addCase(loginUser.rejected, (state,action)=>{
            state.loading=false;
            state.user = action.payload;
         })
    },


    });

export const  {logout} = authSlice.actions;
export default authSlice.reducer;