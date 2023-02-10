import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchQuote } from "./quoteAPI";
import { QuotesAPIType } from "./quoteAPI";

export interface QuoteData {
    quoteText: string,
    quoteAuthor: string,
}

export interface QuotesState {
    currentIndex: number,
    quoteList: QuoteData[],
    status: 'idle' | 'loading' | 'failed';
}

const initialState: QuotesState = {
    currentIndex: 0,
    quoteList: [],
    status: 'idle'
}

export const getRandomQuoteAsync = createAsyncThunk(
    'quote/fetchQuote',
    async () => {
        const response: QuotesAPIType[] = await fetchQuote();
        if (response.length === 0)
            return;

        return response.map(item => ({
            quoteText: item.quote,
            quoteAuthor: item.author
        } as QuoteData) );
    }
)

export const quotesSlice = createSlice({
    name: 'quote',
    initialState: initialState,
    reducers: {
        getNextQuote: (state) => {
            const newIndex = state.currentIndex + 1 >= state.quoteList.length ? 0 : state.currentIndex + 1;
            state.currentIndex = newIndex;
        },
        getPreviousQuote: (state) => {
            const newIndex = state.currentIndex <= 0 ? state.quoteList.length - 1 : state.currentIndex - 1;
            state.currentIndex = newIndex;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRandomQuoteAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getRandomQuoteAsync.fulfilled, (state, action) => {
                if (!action.payload)
                    return;
                state.status = 'idle';
                state.quoteList.push(...action.payload);
            })
            .addCase(getRandomQuoteAsync.rejected, (state) => {
                state.status = 'failed';
            })
    }
})

export const selectQuote = (state: RootState) => state.quote.quoteList[state.quote.currentIndex];
//Load new array of quotes when reach the end of array
export const selectQuoteNeedsNewLoad = (state: RootState) => state.quote.currentIndex + 2 >= state.quote.quoteList.length;

export const { getNextQuote, getPreviousQuote } = quotesSlice.actions;

export default quotesSlice.reducer;