import { createSlice } from "@reduxjs/toolkit";

export const amountReducer = createSlice({
  name: "amount",
  initialState: 0,
  reducers: {
    sendamount: (state, action) => {
      return action.payload;
    },
  },
});

export const { sendamount } = amountReducer.actions;
export default amountReducer.reducer;
 
