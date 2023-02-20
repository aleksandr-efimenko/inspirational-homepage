import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type AutoDetectedLocationStateStatus = 'not-set' | 'loading' | 'loaded' | 'failed';

export type AutoDetectedLocationState = {
    longitude: number,
    latitude: number,
    status?: AutoDetectedLocationStateStatus;
}

const initialState: AutoDetectedLocationState = {
    latitude: 0,
    longitude: 0,
    status: 'not-set'
}

const locationAutoDetectSlice = createSlice({
    name: 'locationAuto',
    initialState: initialState,
    reducers: {
        setLocationAuto: (state, action: PayloadAction<AutoDetectedLocationState>) => {
            state.latitude = action.payload.latitude;
            state.longitude = action.payload.longitude;
            state.status = 'loaded';
        },
        setLocationAutoStatus: (state, action: PayloadAction<AutoDetectedLocationStateStatus>) => {
            state.status = action.payload
        }
    }
})

export const selectAutoGeoposition = (state: RootState) => { return state.locationAuto }

export const { setLocationAuto, setLocationAutoStatus } = locationAutoDetectSlice.actions;

export default locationAutoDetectSlice.reducer;
