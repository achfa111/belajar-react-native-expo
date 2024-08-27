import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCars = createAsyncThunk(                                               // search mobil
    "fetchCars", async (signal) => {
        const res = await fetch(`https://api-car-rental.binaracademy.org/customer/car/`, { signal});  // pakai signal ada fungsi dari abort controller
        return res?.json();
    });


export const fetchCarsDetails = createAsyncThunk(                                         // search id
    "fetchCarsDetails",
    async ({id, signal}) => {
        const res = await fetch(`https://api-car-rental.binaracademy.org/customer/car/` + id, {signal});            // payload = id yg kita kirim   [ payload = penamaan aja ]
        return res?.json();
    }
);

