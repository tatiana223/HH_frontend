import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Vacancies } from '../api/Api';
import { api } from '../api';
import { VACANCIES_MOCK } from '../modules/mock';
import { setResponseId, setCount } from './responseDraftSlice';

interface VacanciesState {
  searchValue: string;
  vacancies: Vacancies[];
  loading: boolean;
}

const initialState: VacanciesState = {
  searchValue: '',
  vacancies: [],
  loading: false,
};

export const getVacanciesList = createAsyncThunk(
  'vacancies/getVacanciesList',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { vacancies }: any = getState();
    try {
      const response = await api.vacancies.vacanciesList({vacancy_name: vacancies.searchValue});

      const response_id = response.data.draft_responses; // ID черновой заявки
      const count = response.data.count; // количество услуг в черновой заявке

      dispatch(setResponseId(response_id));
      dispatch(setCount(count));
      
      return response.data;
    } catch (error) {
      return rejectWithValue('Ошибка при загрузке данных');
    }
  }
);

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVacanciesList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVacanciesList.fulfilled, (state, action) => {
        state.loading = false;
        state.vacancies = action.payload.vacancies;
      })
      .addCase(getVacanciesList.rejected, (state) => {
        state.loading = false;
        state.vacancies = VACANCIES_MOCK.vacancies.filter((item) =>
          item.vacancy_name.toLocaleLowerCase().startsWith(state.searchValue.toLocaleLowerCase())
        );
      });
  },
});

export const { setSearchValue } = vacanciesSlice.actions;
export default vacanciesSlice.reducer;