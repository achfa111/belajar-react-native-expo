import { configureStore } from "@reduxjs/toolkit";
import reactotron from "../ReactotronConfig";
import carSlice from "./reducer/car/carSlice";
import carDetailsSlice from "./reducer/car/carDetailsSlice";
import userSlice from "./reducer/auth/loginSlice";
import orderSlice from "./reducer/order/orderSlice";

export const store = configureStore({
  reducer: {
    car: carSlice,
    carDetails: carDetailsSlice,
    order: orderSlice,
    user: userSlice,
  },
  enhancers: (getDefaultEnhancers) =>
    __DEV__ ? getDefaultEnhancers()
  .concat(reactotron.createEnhancer()) : getDefaultEnhancers()
});
