import { createSlice } from "@reduxjs/toolkit";
import IMG1 from '../../images/background-1.jpg';
import IMG2 from '../../images/background-2.jpg';
import IMG3 from '../../images/background-3.jpg';
import { RootState } from "../../app/store";

export interface BackgroundLocalState {
    imageSources: string[];
    currentIndex: number;
}

const initialState: BackgroundLocalState = {
    imageSources: [IMG1, IMG2, IMG3],
    currentIndex: 0,
}

export const backgroundLocalSclice = createSlice({
    name: 'backgroundLocal',
    initialState: initialState,
    reducers: {
        getNextBgLocal: (state) => {
            const newIndex = state.currentIndex + 1 === state.imageSources.length ? 0 : state.currentIndex + 1;
            state.currentIndex = newIndex;
        },
        getPreviousBgLocal: (state) => {
            const newIndex = state.currentIndex === 0 ? state.imageSources.length - 1 : state.currentIndex - 1;
            state.currentIndex = newIndex;
        }
    }
})

export const selectBackgroundLocal = (state: RootState)  => state.backgroundLocal.imageSources[state.backgroundLocal.currentIndex];
export const selsectBGLocalList = (state: RootState) => state.backgroundLocal.imageSources;

export const { getNextBgLocal, getPreviousBgLocal } = backgroundLocalSclice.actions;

export default backgroundLocalSclice.reducer;