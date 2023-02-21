import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type ModalContentState = 'Auth' | 'locationSelect' | undefined
export type ModalState = {
    modalWindowDisplay: boolean,
    content: ModalContentState
}

const initialState: ModalState = {
    modalWindowDisplay: false,
    content: undefined
}

const modalWindowSlice = createSlice({
    name: 'modalWindow',
    initialState: initialState,
    reducers: {
        showModalWindow: (state, action) => {
            state.modalWindowDisplay = action.payload;
        },
        openAuth: (state) => {
            state.content = 'Auth';
        },
        openLocationSelect: (state) => {
            state.content = 'locationSelect';
        }
    }
})

export const selectShowModal = (state: RootState) => state.modalWindow.modalWindowDisplay;

export const { showModalWindow, openAuth, openLocationSelect } = modalWindowSlice.actions;

export default modalWindowSlice.reducer;