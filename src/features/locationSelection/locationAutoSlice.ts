import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type AutoDetectedLocationStateStatus = 'not-set' | 'loading' | 'loaded' | 'failed';
export type Coordinates = {
    longitude: number,
    latitude: number
}

export type AutoDetectedLocationState = {
    location: Coordinates,
    status: AutoDetectedLocationStateStatus;
}

const initialState: AutoDetectedLocationState = {
    location: {
        latitude: 0,
        longitude: 0
    },
    status: 'not-set'
}

const locationAutoDetectSlice = createSlice({
    name: 'locationAuto',
    initialState: initialState,
    reducers: {
        setLocationAuto: (state, action: PayloadAction<Coordinates>) => {
            // console.log(action.payload)
            state.location.latitude = action.payload.latitude;
            state.location.longitude = action.payload.longitude;
            state.status = 'loaded';
        },
        setAutoLocationStatus: (state, action: PayloadAction<AutoDetectedLocationStateStatus>) => {
            state.status = action.payload
        }
    }
})

export const selectAutoGeoposition = (state: RootState) => { return state.locationAuto.location }
export const selectAutoGeopositionStatus = (state: RootState) => {return state.locationAuto.status}

export const { setLocationAuto, setAutoLocationStatus } = locationAutoDetectSlice.actions;

export default locationAutoDetectSlice.reducer;
