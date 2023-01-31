import { createSlice } from "@reduxjs/toolkit";
import IMG1 from '../../images/background-1.jpg';
import IMG2 from '../../images/background-2.jpg';
import IMG3 from '../../images/background-3.jpg';

export interface BackgroundState {
    imageSources: string[];
    currentImg: string;
    currentIndex: number;
}

const initialState: BackgroundState = {
    imageSources: [IMG1, IMG2, IMG3],
    currentImg: IMG1,
    currentIndex: 0,
}

export const backgroundSclice = createSlice({
    name: 'background',
    initialState: initialState,
    reducers: {
        getNextBg: (state) => {
            const newIndex = state.currentIndex + 1 === state.imageSources.length ? 0 : state.currentIndex + 1;
            state.currentImg = state.imageSources[newIndex];
            state.currentIndex = newIndex;
        },
        getPreviousBg: (state) => {
            const newIndex = state.currentIndex === 0 ? state.imageSources.length - 1 : state.currentIndex - 1;
            state.currentImg = state.imageSources[newIndex];
            state.currentIndex = newIndex;
        }
    }
})

export const selectBackground = (state: { background: { currentImg: string; }; })  => state.background.currentImg;

export const { getNextBg, getPreviousBg } = backgroundSclice.actions;

export default backgroundSclice.reducer;