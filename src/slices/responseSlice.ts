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
  'responses/fetchResponse',
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
  'responses/fetchResponse',
  async (credintials: { idResponse: string, status: number }) => {
    try {
      await api.responses.responsesUpdateStatusAdminUpdate(credintials.idResponse, {status: credintials.status});
    } catch (error) {
      throw new Error('Ошибка при загрузке заявок');
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
      });
  },
});

export const { setFilteredResponses } = ResponseSlice.actions;
export default ResponseSlice.reducer;