import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchBackgroundUnsplash } from "./backgroundAPI";
import { UnsplashBackground } from "./unsplashBackground";
import { RootState } from "../../app/store";

export interface backgroundUnsplashState {
    imageUrls: string[],
    currentIndex: number,
    status: 'idle' | 'loading' | 'failed'
}

const initialState: backgroundUnsplashState = {
    imageUrls: [],
    currentIndex: 0,
    status: 'loading'
}

export const getRandomImageAsync = createAsyncThunk(
    'backgroundUnsplash',
    async () => {
        const response: UnsplashBackground[] = await fetchBackgroundUnsplash();
        if (response.length === 0)
            return;
        return response;
    }
)

export const backgroundUnsplashSlice = createSlice({
    name: 'backgroundUnsplash',
    initialState: initialState,
    reducers: {
        getNextBgUnsplash: (state) => {
            const newIndex = state.currentIndex + 1 >= state.imageUrls.length ? 0 : state.currentIndex + 1;
            state.currentIndex = newIndex;
        },
        getPreviousBgUnsplash: (state) => {
            const newIndex = state.currentIndex <= 0 ? state.imageUrls.length - 1 : state.currentIndex - 1;
            state.currentIndex = newIndex;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRandomImageAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getRandomImageAsync.fulfilled, (state, action) => {
                if (!action.payload || action.payload.length === 0) {
                    state.status = 'failed';
                    return;
                }
                state.status = 'idle';
                state.imageUrls.push(...action.payload.map(el => el.urls.regular));
            })
            .addCase(getRandomImageAsync.rejected, (state) => {
                state.status = 'failed';
            })
    }
})

export const { getPreviousBgUnsplash, getNextBgUnsplash } = backgroundUnsplashSlice.actions;

export const selectBackgroundUnsplash = (state: RootState) => state.backgroundUnsplash.imageUrls[state.backgroundUnsplash.currentIndex];
export const selectBGImagesUrls = (state: RootState) => state.backgroundUnsplash.imageUrls;
export const selectBGIndex = (state: RootState) => state.backgroundUnsplash.currentIndex;
export const selectBackgroundUnsplashStatus = (state: RootState) => state.backgroundUnsplash.status;
export const selectBackgroundUnsplashNeedNewLoad = (state: RootState) => state.backgroundUnsplash.currentIndex + 2 >= state.backgroundUnsplash.imageUrls.length;

export default backgroundUnsplashSlice.reducer;