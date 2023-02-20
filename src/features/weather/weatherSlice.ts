import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchWeatherByLocation } from "./weatherAPI";
import { WeatherDataFromAPI } from "./weatherDataFromAPI";
import { AutoDetectedLocationState } from "../locationSelection/locationAutoSlice";

export type WeatherData = {
    temperature: number,
    icon: string,
    description: string,
    unit: string,
    location?: string
}

export interface WeatherLoadingState {
    currentWeather: WeatherData;
    autoDetectedLocation: AutoDetectedLocationState;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: WeatherLoadingState = {
    currentWeather: {} as WeatherData,
    autoDetectedLocation: {
        longitude: 0,
        latitude: 0
    },
    status: 'idle'
}

export const getWeatherAsync = createAsyncThunk(
    'weather/fetchWeather',
    async (location: AutoDetectedLocationState) => {
        const response: WeatherDataFromAPI = await fetchWeatherByLocation(location.longitude, location.latitude);
        if (response.weather.length === 0 || !response.main)
            return;

        const weatherData: WeatherData = {
            temperature: Number(response.main.temp.toFixed(0)),
            icon: response.weather[0].icon,
            description: response.weather[0].description,
            unit: '°C',
            location: response.name
        }
        return weatherData;
    }
)

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getWeatherAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getWeatherAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload)
                    state.currentWeather = action.payload;
            })
            .addCase(getWeatherAsync.rejected, (state) => {
                state.status = 'failed';
            })
    }
});

export const selectWeather = (state: RootState) => state.weather.currentWeather;
export const selectWeatherLoadingStatus = (state: RootState) => state.weather.status;


export default weatherSlice.reducer;