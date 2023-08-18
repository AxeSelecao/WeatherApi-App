import { createSlice } from "@reduxjs/toolkit";

const initialState = {
//  city: "Astana",
};

const weatherSlice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    chooseCity(state, action) {
      console.log(action.payload);
      state.city = action.payload;
    },
    chooseDate(state, action) {
      console.log(action.payload);
      state.date = action.payload;
    },
  },
});

export const { chooseCity, chooseDate } = weatherSlice.actions;

export default weatherSlice.reducer;
