import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import smartHomeReducer from "../features/smartHome/smartHomeSlice"



export const store = configureStore({
    reducer: {
        auth: authReducer,
        smartHome: smartHomeReducer,
    },
});
