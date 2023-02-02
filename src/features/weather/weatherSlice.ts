import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchWeather } from "./weatherAPI";
import { useSelector } from "react-redux";
import { WeatherLocation } from "./Weather";

export interface WeatherState {
    currentWeather: string;
    location: WeatherLocation;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: WeatherState = {
    currentWeather: '-',
    location: {
        longitude: 0,
        latitude: 0
    },
    status: 'idle'
}



export const getWeatherAsync = createAsyncThunk(
    'weather/fetchWeather',
    async (location: any) => {
        const response = await fetchWeather(location.longitude, location.latitude);
        console.log(response);
        if (response.main.temp) 
            if (response.weather.length > 0) {
                const description = response.weather[0].description;
                return description + ' ' + response.main.temp;
            }
            return response.main.temp;
        return '--';
    }
)

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: initialState,
    reducers: {
        setLocation: (state, action) => {
            state.location.latitude = action.payload.latitude;
            state.location.longitude = action.payload.longitude;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWeatherAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getWeatherAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.currentWeather = action.payload;
            })
            .addCase(getWeatherAsync.rejected, (state) => {
                state.status = 'failed';
            })
    }
});

export const selectWeather = (state: RootState) => state.weather.currentWeather;
const selectLocation = (state: RootState) => state.weather.location;

export const { setLocation } = weatherSlice.actions;

export default weatherSlice.reducer;