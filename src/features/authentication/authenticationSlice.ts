import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type AuthenticationState = {
    email: string;
    password: string;
    user: object;
}

const initialState: AuthenticationState = {
    email: 'test@test.com',
    password: 'testpass',
    user: {}
}

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: {
        authorize: (state, action) => {
            state.user = action.payload.user;
        }
    }
})

export const selectUser = (state: RootState) => state.authentication.user;

export const { authorize } = authenticationSlice.actions;

export default authenticationSlice.reducer;

