import { createSlice } from "@reduxjs/toolkit";
import IMG1 from '../../../public/img/background-1.jpg';

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