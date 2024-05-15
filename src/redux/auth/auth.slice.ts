import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user.types";

type AuthStateType = {
    user: User | null,
    isAuthanticated: boolean,
    isInitialized: boolean
}

const initialState = {
    user: null,
    isAuthanticated: false,
    isInitialized: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state: AuthStateType, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthanticated = true;
            state.isInitialized = true;
        },
        // getUser:(state: AuthStateType,action:PayloadAction<User>)=>{
        //     state.user=action.payload
        //  },
        
        setInitialize: (state: AuthStateType) => {
            state.isInitialized = true
        }
    }
})

export const { setUser, setInitialize } = authSlice.actions

export default authSlice.reducer