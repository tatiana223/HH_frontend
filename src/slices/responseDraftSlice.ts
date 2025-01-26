import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';

interface Vacancy {
  vacancy_id?: number;
  vacancy_name: string;
  money_from: number;
  money_to: number;
  url?: string;
  city: string;
  name_company: string;
  peculiarities: string;
  request: number;
  quantity: number;
  
}

interface ResponseData {
  name_human?: string | null;
  education?: string | null;
  experience?: string | null;
  peculiarities_comm?: string | null;

}

interface ResponseState {
  id_response?: number;
  quantity: number | undefined;

  vacancies: Vacancy[]; // массив услуг
  responseData: ResponseData; // поля заявки
  isDraft: boolean;
  error: string | null;
}

const initialState: ResponseState = {
  id_response: NaN,
  quantity: NaN,

  vacancies: [],
  responseData: {
    name_human: '',
    education: '',
    experience: '',
    peculiarities_comm: ''
  },
  isDraft: false,
  error: null,
};


export const getResponse = createAsyncThunk(
  'response/getResponse',
  
  async (idResponse: string) => {
    const response = await api.responses.responsesRead(idResponse);
    console.log (response.data);
    return response.data;
    
  }
);

export const addVacancyToResponse = createAsyncThunk(
  'vacancies/addVacancyToResponse',
  async (vacancyId: number) => {
    const response = await api.vacancies.vacanciesAddToResponseCreate(vacancyId.toString());
    return response.data;
  }
);

export const deleteResponse = createAsyncThunk(
  'responses/deleteResponse',
  async (idResponse: string) => {
    const response = await api.responses.responsesDeleteResponseDelete(idResponse);
    return response.data;
  }
);

const responseDraftSlice = createSlice({
  name: 'responseDraft',
  initialState,
  reducers: {
    setResponseId: (state, action) => {
        state.id_response = action.payload;
      },
      setCount: (state, action) => {
        state.quantity = action.payload;
      },
      setVacancies: (state, action) => {
        state.vacancies = action.payload;
      },
      setResponseData: (state, action) => {
        
        state.responseData = {
            ...state.responseData,
            ...action.payload,
        };
      },
      setError: (state, action) => {
        state.error = action.payload;
      }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getResponse.fulfilled, (state, action) => {
        const { responses, vacancies } = action.payload;
        if (responses && vacancies) {
            state.id_response = responses.id_response;
            state.vacancies = vacancies;
            state.responseData = {
                name_human: responses.name_human,
                education: responses.education,
                experience: responses.experience,
                peculiarities_comm: responses.peculiarities_comm,
            };
            state.isDraft = responses.status === 1;
            
        }
      })
      .addCase(deleteResponse.fulfilled, (state) => {
        state.id_response = NaN;
        state.quantity = NaN;
        state.vacancies = [];
        state.responseData = {
          name_human: '',
          education: '',
          experience: '',
          peculiarities_comm: ''
        };
      })
      .addCase(deleteResponse.rejected, (state) => {
        state.error = 'Ошибка при удалении вакансии';
      })
      .addCase(getResponse.rejected, (state) => {
        state.error = 'Ошибка при загрузке данных';
      });
      
  }
});


export const {setError, setResponseId, setCount} = responseDraftSlice.actions;
export default responseDraftSlice.reducer;
