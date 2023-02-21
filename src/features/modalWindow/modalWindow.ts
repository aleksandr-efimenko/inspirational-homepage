import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type ModalContentState = 'LoginForm' | 'locationSelect' | undefined
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
        openLoginForm: (state) => {
            state.modalWindowDisplay = true;
            state.content = 'LoginForm';
        },
        openLocationSelect: (state) => {
            state.modalWindowDisplay = true;
            state.content = 'locationSelect';
        },
        closeModalWindow: (state) => {
            state.modalWindowDisplay = false;
        },
    }
})

export const selectShowModal = (state: RootState) => state.modalWindow.modalWindowDisplay;

export const { openLoginForm, openLocationSelect, closeModalWindow } = modalWindowSlice.actions;

export default modalWindowSlice.reducer;