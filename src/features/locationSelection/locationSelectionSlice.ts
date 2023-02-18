import { createSlice } from "@reduxjs/toolkit";
import { CityWithCountry } from "../../components/LocationSelection/LocationSelect";
import { RootState } from "../../app/store";

interface LocationSelectState {
    settingLocationManually: boolean,
    manualLocation: CityWithCountry
}

const initialState: LocationSelectState = {
    settingLocationManually: false,
    manualLocation: {} as CityWithCountry
}

const locationSelectionSlice = createSlice({
    name: 'locationManually',
    initialState: initialState,
    reducers: {
        setLocationManually: (state) => {
            state.settingLocationManually = true;
        },
        setLocationCityAndCountry: (state, action) => {
            state.settingLocationManually = false;
            state.manualLocation.city = action.payload.city;
            state.manualLocation.country = action.payload.country;
        }
    }
})

export const selectCurrentLocation = (state:RootState) => { return state.LocationSelect.manualLocation }

export const { setLocationManually, setLocationCityAndCountry } = locationSelectionSlice.actions;

export default locationSelectionSlice.reducer;