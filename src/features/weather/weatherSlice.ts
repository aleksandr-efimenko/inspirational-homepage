import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchWeatherByCity, fetchWeatherByAutoLocation } from "./weatherAPI";
import { WeatherDataFromAPI } from "./weatherDataFromAPI";
import { Coordinates } from "../locationSelection/locationAutoSlice";
import { CityWithCountry } from "../../components/LocationSelection/LocationSelect";

export type WeatherData = {
    temperature: number,
    icon: string,
    description: string,
    unit: string,
    location?: string
}

export interface WeatherLoadingState {
    currentWeather: WeatherData;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: WeatherLoadingState = {
    currentWeather: {} as WeatherData,
    status: 'idle'
}

export const getWeatherFromAutoLocationAsync = createAsyncThunk(
    'weather/fetchWeatherByAutoLocation',
    async (location: Coordinates) => {
        const response: WeatherDataFromAPI = await fetchWeatherByAutoLocation(location.longitude, location.latitude);
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

export const getWeatherFromManualLocationAsync = createAsyncThunk(
    'weather/fetchWeatherByCity',
    async (location: CityWithCountry) => {
        const response: WeatherDataFromAPI = await fetchWeatherByCity(location.city, location.countryCode);

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
            .addCase(getWeatherFromAutoLocationAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getWeatherFromAutoLocationAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload)
                    state.currentWeather = action.payload;
            })
            .addCase(getWeatherFromAutoLocationAsync.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(getWeatherFromManualLocationAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getWeatherFromManualLocationAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload)
                    state.currentWeather = action.payload;
            })
            .addCase(getWeatherFromManualLocationAsync.rejected, (state) => {
                state.status = 'failed';
            })
    }
});

export const selectWeather = (state: RootState) => state.weather.currentWeather;
export const selectWeatherLoadingStatus = (state: RootState) => state.weather.status;


export default weatherSlice.reducer;