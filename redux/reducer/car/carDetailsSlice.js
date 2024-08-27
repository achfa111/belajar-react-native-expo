import { createSlice } from "@reduxjs/toolkit";
import { fetchCarsDetails } from "./carApi";

const carDetailsSlice = createSlice({
    name: "carDetails",
    initialState: {
        isLoading: false,
        data: {},
        isError: false,
        errorMessage: null,
    },

    extraReducers: (builder) => {
        builder.addCase(fetchCarsDetails.pending, (state, action) => {
            state.isLoading = true;
        });

        builder.addCase(fetchCarsDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });

        builder.addCase(fetchCarsDetails.rejected, (state, action) => {
            state.isError = true;
            state.errorMessage = action.error;
        });
    },
});

export const getCarDetails =  fetchCarsDetails;
export const selectCarDetails = state => state.carDetails        // selector
export default carDetailsSlice.reducer