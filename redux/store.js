import { configureStore } from "@reduxjs/toolkit";
import reactotron from "../ReactotronConfig";
import carSlice from "./reducer/car/carSlice";
import carDetailsSlice from "./reducer/car/carDetailsSlice";

console.log(__DEV__);
export const store = configureStore({
  reducer: {
    car: carSlice,
    carDetails: carDetailsSlice
  },
  enhancers: 
  (getDefaultEnhancers) =>
    __DEV__
      ? getDefaultEnhancers()
      .concat(reactotron.createEnhancer()) : getDefaultEnhancers()
});
