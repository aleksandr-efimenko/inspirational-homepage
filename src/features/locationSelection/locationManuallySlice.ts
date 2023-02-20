import { createSlice } from "@reduxjs/toolkit";
import { CityWithCountry } from "../../components/LocationSelection/LocationSelect";
import { RootState } from "../../app/store";

interface LocationSelectState {
    modalWindowDisplay: boolean,
    manualLocation: CityWithCountry,
    status: 'set' | 'not-set'
}

const initialState: LocationSelectState = {
    modalWindowDisplay: false,
    manualLocation: {} as CityWithCountry,
    status: 'not-set'
}

const locationSelectionSlice = createSlice({
    name: 'locationManually',
    initialState: initialState,
    reducers: {
        showModalWindow: (state, action) => {
            state.modalWindowDisplay = action.payload;
        },
        setLocationCityAndCountry: (state, action) => {
            state.modalWindowDisplay = false;
            state.manualLocation.city = action.payload.city;
            state.manualLocation.countryCode = action.payload.countryCode;
            state.status = 'set';
        }
    }
})

export const selectShowModal = (state:RootState) => state.locationManually.modalWindowDisplay;
export const selectManualLocation = (state:RootState) => state.locationManually.manualLocation;
export const selectManualLocationStatus = (state: RootState) => state.locationManually.status;

export const { showModalWindow, setLocationCityAndCountry } = locationSelectionSlice.actions;

export default locationSelectionSlice.reducer;