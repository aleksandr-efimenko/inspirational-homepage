import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface QuotesState {
    quoteText: string
}

const initialState: QuotesState = {
    quoteText: 'Today is the day'
}

export const quotesSlice = createSlice({
    name: 'quote',
    initialState: initialState,
    reducers: {
        getNewQuote: (state) => {

        }
    },
    extraReducers: (builder) => {

    }
})

export const selectQuote = (state: RootState) => state.quote.quoteText;

export const { getNewQuote } = quotesSlice.actions;

export default quotesSlice.reducer;