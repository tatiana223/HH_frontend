// src/slices/vacanciesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Vacancy } from "../modules/vacanciesApi";

interface VacanciesState {
  vacancies: Vacancy[];
  searchValue: string;
  loading: boolean;
}

const initialState: VacanciesState = {
  vacancies: [],
  searchValue: "",
  loading: false,
};

const vacanciesSlice = createSlice({
  name: "vacancies",
  initialState,
  reducers: {
    setVacancies(state, action: PayloadAction<Vacancy[]>) {
      state.vacancies = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setVacancies, setSearchValue, setLoading } = vacanciesSlice.actions;
export default vacanciesSlice.reducer;
