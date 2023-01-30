import { createSlice } from "@reduxjs/toolkit";

export const backgroundSclice = createSlice({
    name: 'background',
    initialState: {
        imageSrc: ''
    },
    reducers: {
        getNextImage: (state) => {
            
        }
    }
})

export default backgroundSclice.reducer;