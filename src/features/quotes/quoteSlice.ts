import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchQuote } from "./quoteAPI";

export interface QuotesState {
    quote: {
        quoteText: string,
        quoteAuthor: string,
    }
    status: 'idle' | 'loading' | 'failed';
}

const initialState: QuotesState = {
    quote: {
        quoteText: '',
        quoteAuthor: ''
    },
    status: 'idle'
}

export const getRandomQuoteAsync = createAsyncThunk(
    'quote/fetchQuote',
    async () => {
        const response = await fetchQuote();
        if (response.lenght === 0)
            return;
        const quote = response[0];
        return quote;
    }
)

export const quotesSlice = createSlice({
    name: 'quote',
    initialState: initialState,
    reducers: {
        // getNewQuote: (state) => {

        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRandomQuoteAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getRandomQuoteAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.quote.quoteText = action.payload.quote;
                state.quote.quoteAuthor = action.payload.author;
            })
            .addCase(getRandomQuoteAsync.rejected, (state) => {
                state.status = 'failed';
            })
    }
})

export const selectQuote = (state: RootState) => state.quote.quote;

// export const { getNewQuote } = quotesSlice.actions;

export default quotesSlice.reducer;