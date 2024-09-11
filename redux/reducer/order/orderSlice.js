import { createSlice } from "@reduxjs/toolkit";
import { postOrder, putOrderSlip } from "./orderApi";

const initialState = {
  isLoading: false,
  carId: null,
  data: {},
  errorMessage: null,

  currentSte: null,
  selectedbank: null,
  promo: null,
  isModalVisible: false,
  status: "pending",
  activeStep: 0,                      // <<<<<< tadi ditambahin bang Amir activeState ( diganti jadi activeStep, siapa tau pengaruh ke yg lainnya )
  //paymentCountdown: null,
  //verificationCountdown: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {                                     // reducers ini bukan dari component, tapi ambil dari bawaan

    setCarId: (state, { payload }) => {
      state.carId = payload;
    },

    setStateByName: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },

    resetState: (state) => {
      state = initialState
    }
  },

  extraReducers: (builder) => {
    builder.addCase(postOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.status = "success";
      // state.isModalVisible = true;
    });
    builder.addCase(postOrder.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true;
      state.status = "error";
      state.errorMessage = action.payload
      // state.isModalVisible = true;
    });
    

    builder.addCase(putOrderSlip.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(putOrderSlip.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.status =  "upload-success"
      // state.isModalVisible = true;
    });
    builder.addCase(putOrderSlip.rejected, (state, action) => {
      state.isLoading = false
      // state.isError = true;
      state.errorMessage = action.payload
      // state.isModalVisible = true;
    });
  },
})

export { postOrder, putOrderSlip };
export const { setCarId, setStateByName, resetState } = orderSlice.actions
export const selectOrder = (state) => state.order //selector
export default orderSlice.reducer












