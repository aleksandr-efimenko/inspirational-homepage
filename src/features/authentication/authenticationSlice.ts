import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { authorize } from "./authAPI";

export type AuthenticationState = {
    status: 'not-authorized' | 'loading' | 'authorized' | 'failed';
    errorMessage: string;
}

const initialState: AuthenticationState = {
    status: 'not-authorized',
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


const handleAuthError = (errorMessage: string) => {
    if (errorMessage.includes('user-not-found')) {
        console.log(errorMessage)
        return 'User not found'
    }
    return 'Error';
}

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: {
        logout: (state) => {
            state.status = 'not-authorized';
            state.errorMessage = '';
        },
        resetErrorMessage: (state) => {
            state.errorMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authorizeAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(authorizeAsync.fulfilled, (state, action) => {
                if (typeof action.payload === 'string') {
                    state.status = 'failed';
                    state.errorMessage = handleAuthError(action.payload);
                }
                if (typeof action.payload !== 'string') {
                    state.status = 'authorized';
                    state.errorMessage = '';
                }
            })
            .addCase(authorizeAsync.rejected, (state, action) => {
                state.status = 'failed';
                if (typeof action.payload === 'string')
                    state.errorMessage = action.payload || '';
            })
    }
})

export const selectAuthStatus = (state: RootState) => state.authentication;

export const { logout, resetErrorMessage } = authenticationSlice.actions;

export default authenticationSlice.reducer;

