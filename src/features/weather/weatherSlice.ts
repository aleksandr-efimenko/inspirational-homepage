import { createSlice } from "@reduxjs/toolkit";

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
    extraReducers: {

    }
});

export const selectWeather = (state: { weather: { currentWeather: any; }; }) => state.weather.currentWeather;

export const { getWeather } = weatherSlice.actions;

export default weatherSlice.reducer;