import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type ModalContentState = 'LoginForm' | 'locationSelect' | 'RegistrationForm' | 'ResetPasswordForm' | undefined
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
        openRegistrationForm: (state) => {
            state.modalWindowDisplay = true;
            state.content = 'RegistrationForm';
        },
        openResetPasswordForm: (state) => {
            state.modalWindowDisplay = true;
            state.content = 'ResetPasswordForm';
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
export const selectModalContent = (state: RootState) => state.modalWindow.content;

export const { openLoginForm, openRegistrationForm, openResetPasswordForm, openLocationSelect, closeModalWindow } = modalWindowSlice.actions;

export default modalWindowSlice.reducer;