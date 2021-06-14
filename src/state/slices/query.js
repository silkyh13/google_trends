import { createSlice } from "@reduxjs/toolkit";

export const query = createSlice({
  name: "query",
  initialState: { value: [], default: { labels: [], datasets: [] } },
  reducers: {
    setQuery: (state, action) => {
      // console.log(action.payload);
      state.value = [...state.value, action.payload];
    },
    setDefault: (state, action) => {
      state.default.labels = [
        ...state.default.labels,
        ...action.payload.labels,
      ];
      state.default.datasets = [
        ...state.default.datasets,
        ...action.payload.datasets,
      ];
    },
  },
});

export const { setQuery, setDefault } = query.actions;
export const stateOfquery = (state) => state.query;

export default query.reducer;
