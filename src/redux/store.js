import { configureStore } from "@reduxjs/toolkit";
import BoardSlice from "./BoardSlice";
export const store = configureStore({
    reducer:{
        board:BoardSlice,
    }
})