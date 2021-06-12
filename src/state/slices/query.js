import { createSlice } from "@reduxjs/toolkit";

export const query = createSlice({
  name: "query",
  initialState: { value: [] },
  reducers: {
    setQuery: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const { setQuery } = query.actions;
export const stateOfquery = (state) => state.query;

export default query.reducer;
