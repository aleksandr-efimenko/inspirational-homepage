import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchBackgroundUnsplash } from "./backgroundAPI";
import { UnsplashBackground } from "./unsplashBackground";
import { RootState } from "../../app/store";

export interface backgroundUnsplashState {
    imageSource?: string,
    staus: 'idle' | 'loading' | 'failed'
}

const initialState: backgroundUnsplashState = {
    imageSource: undefined,
    staus: 'idle'
}

export const getRandomImageAsync = createAsyncThunk(
    'backgroundUnsplash',
    async () => {
        const response: UnsplashBackground = await fetchBackgroundUnsplash();
        if (!response.links.download) 
            return;
        return response.links.download;
    }
)

export const backgroundUnsplashSlice = createSlice({
    name: 'backgroundUnsplash',
    initialState: initialState,
    reducers : {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getRandomImageAsync.pending, (state) => {
                state.staus = 'loading'
            })
            .addCase(getRandomImageAsync.fulfilled, (state, action) => {
                state.staus = 'idle';
                state.imageSource = action.payload;
            })
            .addCase(getRandomImageAsync.rejected, (state) => {
                state.staus = 'failed';
            })
    }
})

export const selectBackgroundUnsplash = (state: RootState) => state.backgroundUnsplash.imageSource;

export default backgroundUnsplashSlice.reducer;