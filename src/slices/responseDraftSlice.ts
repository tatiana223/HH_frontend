import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';

interface Vacancy {
  vacancy_id?: { 
    vacancy_id?: number | undefined;
    vacancy_name: string | undefined;
    money_from: number | undefined;
    money_to: number | undefined;
    city: string | undefined;
    name_company: string | undefined;
    peculiarities: string | undefined;
    url?: string | null | undefined;
  } | undefined;
  count?: number | undefined;  
}

interface ResponseData {
  name_human?: string | null;
  education?: string | null;
  experience?: string | null;
  peculiarities_comm?: string | null;

}

interface ResponseState {
  id_response?: number;
  vacancy_name: string;
  count: number | undefined;

  vacancies: Vacancy[]; // массив услуг
  responseData: ResponseData; // поля заявки
  isDraft: boolean;
  error: string | null;
}

const initialState: ResponseState = {
  id_response: NaN,
  vacancy_name: '',
  count: NaN,

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

const responseDraftSlice = createSlice({
  name: 'responseDraft',
  initialState,
  reducers: {
    setResponseId: (state, action) => {
        state.id_response = action.payload;
      },
      setCount: (state, action) => {
        state.count = action.payload;
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
  },

  extraReducers: (builder) => {
    builder
      .addCase(getResponse.fulfilled, (state, action) => {
        const { responses, vacancies } = action.payload;
        if (responses && vacancies) {
            state.id_response = responses.id_response;
            state.responseData = {
                name_human: responses.name_human,
                education: responses.education,
                experience: responses.experience,
                peculiarities_comm: responses.peculiarities_comm,
            };
            state.vacancies = vacancies || [];
            console.log(action.payload)
        }
      })
      .addCase(getResponse.rejected, (state) => {
        state.error = 'Ошибка при загрузке данных';
      });
      
  }
});


export const {setResponseId, setCount} = responseDraftSlice.actions;
export default responseDraftSlice.reducer;