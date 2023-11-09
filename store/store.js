import { configureStore } from "@reduxjs/toolkit";
import amountReducer from "./amountReducer";
import vpaReducer from "./vpaReducer";
import setSocketReducer from "./setSocketReducer";

export const store = configureStore({
  reducer: {
    amount: amountReducer,
    vpa: vpaReducer,
    socket: setSocketReducer,
  },
});
