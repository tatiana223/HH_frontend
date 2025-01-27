import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Vacancies } from '../api/Api';
import { api } from '../api';
import { VACANCIES_MOCK } from '../modules/mock';
import { setResponseId, setCount } from './responseDraftSlice';

interface VacanciesState {
  searchValue: string;
  vacancies: Vacancies[];
  loading: boolean;
  error: string | null,
  vacancy: Vacancies | null;
}

const initialState: VacanciesState = {
  searchValue: '',
  vacancies: [],
  loading: false,
  error: null,
  vacancy: null,
};

export const getVacanciesList = createAsyncThunk(
  'vacancies/getVacanciesList',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { vacancies }: any = getState();
    try {
      const response = await api.vacancies.vacanciesList({vacancy_name: vacancies.searchValue});

      const response_id = response.data.draft_responses; // ID черновой заявки
      const quantity = response.data.quantity; // количество услуг в черновой заявке

      dispatch(setResponseId(response_id));
      dispatch(setCount(quantity));
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue('Ошибка при загрузке данных');
    }
  }
);

export const getVacancy = createAsyncThunk(
  'vacancies/getVacancy',
  async (id: string) => {
    try {
      const response = await api.vacancies.vacanciesRead(id);
      return response.data;
    } catch (error) {
      throw new Error('Не удалось загрузить данные о городе');
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
    setVacancies: (state, action) => {
      state.vacancies = action.payload;
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
      })

      .addCase(getVacancy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVacancy.fulfilled, (state, action) => {
        state.vacancy = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getVacancy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
  },
});

export const { setSearchValue } = vacanciesSlice.actions;
export default vacanciesSlice.reducer;