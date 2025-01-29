import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';


interface ResponseState {
  responses: {
    id_response?: number;
    status?: number;
    created_at: string;
    creator: string;
    moderator?: string | null;
    interview_date?: string | null;
    completed_at?: string | null;
    deleted_at?: string | null;
    name_human?: string | null;
    education?: string | null;
    experience?: string | null;
    peculiarities_comm?: string | null;
    qr?: string;
  }[];
  loading: boolean;
  error: string | null;
}

const initialState: ResponseState = {
  responses: [],
  loading: false,
  error: null,
};

export const fetchResponsesList = createAsyncThunk(
  'responses/fetchResponsesList',  // Уникальное имя для этого действия
  async (filters: { status: number | undefined; date_submitted_start: string | undefined; date_submitted_end: string | undefined }) => {
    const { status, date_submitted_start, date_submitted_end } = filters;
    try {
      const response = await api.responses.responsesList({
        status,
        date_submitted_start,
        date_submitted_end,
      });
      return response.data; // Возвращаем данные заявок
    } catch (error) {
      throw new Error('Ошибка при загрузке заявок');
    }
  }
);

export const fetchResponse = createAsyncThunk(
  'responses/fetchResponseStatusUpdate',  // Уникальное имя для этого действия
  async (credentials: { idResponse: string, status: number }, { dispatch, getState }) => {
    try {
      await api.responses.responsesUpdateStatusAdminUpdate(credentials.idResponse, { status: credentials.status });

      // Получаем актуальный список откликов из Redux
      const state = getState() as { response: ResponseState };
      const updatedResponses = state.response.responses.map((response) =>
        response.id_response === parseInt(credentials.idResponse)
          ? { ...response, status: credentials.status }
          : response
      );

      // Возвращаем обновленные данные
      dispatch(setFilteredResponses(updatedResponses)); // Обновляем данные откликов в Redux

      return updatedResponses; // Возвращаем обновленные отклики
    } catch (error) {
      throw new Error('Ошибка при обновлении отклика');
    }
  }
);

const ResponseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {
    setFilteredResponses(state, action) {
      state.responses = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResponsesList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResponsesList.fulfilled, (state, action) => {
        state.loading = false;
        state.responses = action.payload; // Получаем и сохраняем список заявок
      })
      .addCase(fetchResponsesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
      .addCase(fetchResponse.fulfilled, (state, action) => {
        state.loading = false;
        // Обновляем отклики в случае успешного изменения статуса
        state.responses = action.payload;
      });
  },
});

export const { setFilteredResponses } = ResponseSlice.actions;
export default ResponseSlice.reducer;
