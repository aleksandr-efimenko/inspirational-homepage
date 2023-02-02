import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface WeatherState {
    currentWeather: string;
}

const initialState: WeatherState = {
    currentWeather: '15 C'
}

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: initialState,
    reducers: {
        getWeather: () => {
            
        }
    },
    extraReducers: (builder) => {
        // builder
            // .addCase()
    }
});

export const selectWeather = (state: RootState) => state.weather.currentWeather;

export const { getWeather } = weatherSlice.actions;

export default weatherSlice.reducer;