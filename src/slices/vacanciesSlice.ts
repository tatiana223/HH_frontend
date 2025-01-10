import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  vacancies: [],
  loading: false,
};
const vacanciesSlice = createSlice({
  name: "vacancies",
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearchValue } = vacanciesSlice.actions;
export default vacanciesSlice.reducer;
