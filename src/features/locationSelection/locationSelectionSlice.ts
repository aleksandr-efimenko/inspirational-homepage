import { createSlice } from "@reduxjs/toolkit";
import { CityWithCountry } from "../../components/LocationSelection/LocationSelect";
import { RootState } from "../../app/store";

interface LocationSelectState {
    modalWindowDisplay: boolean,
    manualLocation: CityWithCountry
}

const initialState: LocationSelectState = {
    modalWindowDisplay: false,
    manualLocation: {} as CityWithCountry
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
            state.manualLocation.country = action.payload.country;
        }
    }
})

export const selectShowModal = (state:RootState) => { return state.locationManually.modalWindowDisplay }
export const selectCurrentLocation = (state:RootState) => { return state.locationManually.manualLocation }

export const { showModalWindow, setLocationCityAndCountry } = locationSelectionSlice.actions;

export default locationSelectionSlice.reducer;