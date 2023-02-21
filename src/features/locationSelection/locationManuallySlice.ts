import { createSlice } from "@reduxjs/toolkit";
import { CityWithCountry } from "../../components/LocationSelection/LocationSelect";
import { RootState } from "../../app/store";

interface LocationSelectState {
    manualLocation: CityWithCountry,
    status: 'set' | 'not-set'
}

const initialState: LocationSelectState = {
    manualLocation: {} as CityWithCountry,
    status: 'not-set'
}

const locationSelectionSlice = createSlice({
    name: 'locationManually',
    initialState: initialState,
    reducers: {
        setLocationCityAndCountry: (state, action) => {
            state.manualLocation.city = action.payload.city;
            state.manualLocation.countryCode = action.payload.countryCode;
            state.status = 'set';
        }
    }
})

export const selectManualLocation = (state:RootState) => state.locationManually.manualLocation;
export const selectManualLocationStatus = (state: RootState) => state.locationManually.status;

export const { setLocationCityAndCountry } = locationSelectionSlice.actions;

export default locationSelectionSlice.reducer;