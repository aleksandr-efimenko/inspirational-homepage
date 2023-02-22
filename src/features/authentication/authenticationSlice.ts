import { Action, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { authorize } from "./authAPI";
import { FirebaseError } from "firebase/app";
import { User } from "firebase/auth";

export type AuthenticationState = {
    status: 'not-authorized' | 'loading' | 'authorized' | 'failed';
    userEmail: string;
    userId: string;
    errorMessage: string;
}

const initialState: AuthenticationState = {
    status: 'not-authorized',
    userEmail: '',
    userId: '',
    errorMessage: ''
}

export type LoginCredentials = {
    email: string,
    password: string
}

export const authorizeAsync = createAsyncThunk(
    'authentication/authorize',
    async (loginData: LoginCredentials) => {
            return await authorize(loginData.email, loginData.password);
    }
)

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.userEmail = action.payload.userEmail;
            state.userId = action.payload.userId;
        },
        logout: (state) => {
            state.status = 'not-authorized'
            state.userEmail = '';
            state.userId = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authorizeAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(authorizeAsync.fulfilled, (state, action) => {
                state.status = 'authorized';
                if (typeof action.payload !== 'string') {
                    state.userEmail = action.payload.email || '';
                    state.userId = action.payload.uid;
                }
            })
            .addCase(authorizeAsync.rejected, (state, action) => {
                state.status = 'failed';
                if (typeof action.payload === 'string')
                    state.errorMessage = action.payload;
            })
    }
})

export const selectAuthStatus = (state: RootState) => state.authentication;

export const { login, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;

