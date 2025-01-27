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
  quantity: number | null;

  vacancies: Vacancy[]; // массив услуг
  responseData: ResponseData; // поля заявки
  isDraft: boolean;
  isLoading: boolean;
  error: string | null;
  allowedForSubmitted: boolean;
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
  isLoading: false,
  error: null,
  allowedForSubmitted: true
};


export const getResponse = createAsyncThunk(
  'response/getResponse',
  
  async (idResponse: string) => {
    const response = await api.responses.responsesRead(idResponse);
    console.log (response.data);
    return response.data;
    
  }
);

export const updateResponse = createAsyncThunk(
  'responses/updateResponse',
  async ({ idResponse, responseData }: { idResponse: string; responseData: ResponseData }) => {
    const responseDataToSend = {
      name_human: responseData.name_human ?? '', 
      education: responseData.education ?? '',
      experience: responseData.experience ?? '',
      peculiarities_comm: responseData.peculiarities_comm ?? ''
    };
    const response = await api.responses.responsesUpdateResponseUpdate(idResponse, responseDataToSend);
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

export const submittedResponse = createAsyncThunk(
  'responses/submittedResponse',
  async (idResponse: string) => {
    const response = await api.responses.responsesUpdateStatusUserUpdate(idResponse);
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


export const deleteVacancyFromResponse = createAsyncThunk(
  'cities/deleteCityFromVacancyApplication',
  async ({ idResponse, idVacancy }: { idResponse: number; idVacancy: number }) => {
    await api.vacanciesResponses.vacanciesResponsesDeleteVacancyFromResponseDelete(
      idResponse.toString(),
      idVacancy.toString()
    ); 
  }
);

export const updateVacancyResponseCount = createAsyncThunk(
  'vacancies/updateResponseCount',
  async ({ idResponse, idVacancy, quantity }: { idResponse: number; idVacancy: number; quantity: number }) => {
    await api.vacanciesResponses.vacanciesResponsesUpdateResponseUpdate(
      idResponse.toString(),
      idVacancy.toString(),
      { quantity: quantity }
    );
    return { idVacancy, quantity }; // Вернуть обновлённые данные
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
      .addCase(getResponse.pending, (state) => {
        state.isLoading = true;
      })
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
            state.allowedForSubmitted = vacancies.length > 0;
            state.isLoading = false;
            
        }
      })
      /*.addCase(deleteResponse.fulfilled, (state) => {
        state.id_response = NaN;
        state.quantity = NaN;
        state.vacancies = [];
        state.responseData = {
          name_human: '',
          education: '',
          experience: '',
          peculiarities_comm: ''
        };
      })*/
      .addCase(getResponse.rejected, (state) => {
        state.error = 'Ошибка при загрузке данных';
      })


      .addCase(updateResponse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateResponse.fulfilled, (state, action) => {
        state.responseData = action.payload;
      })
      .addCase(updateResponse.rejected, (state) => {
        state.error = 'Ошибка при обновлении данных';
      })


      .addCase(deleteResponse.pending, (state) => {
        state.isLoading = true;
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
        state.isLoading = false;
      })
      .addCase(deleteResponse.rejected, (state) => {
        state.error = 'Ошибка при удалении вакансии';
      })


      .addCase(submittedResponse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submittedResponse.fulfilled, (state) => {
        state.id_response = NaN;
        state.quantity = NaN;
        state.vacancies = [];
        state.responseData = {
          name_human: '',
          education: '',
          experience: '',
          peculiarities_comm: ''
        };
        state.isDraft = false;
        state.isLoading = false;
        state.error = '';
        state.allowedForSubmitted = false;
      })
      .addCase(submittedResponse.rejected, (state) => {
        state.error = 'Ошибка при оформлении вакансии';
        state.isLoading = false;
      })


      .addCase(addVacancyToResponse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addVacancyToResponse.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addVacancyToResponse.rejected, (state) => {
        state.isLoading = false;
      })


      .addCase(deleteVacancyFromResponse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteVacancyFromResponse.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteVacancyFromResponse.rejected, (state) => {
        state.isLoading = false;
      })


      .addCase(updateVacancyResponseCount.fulfilled, (state, action) => {
        const { idVacancy, quantity} = action.payload;
        const vacancy = state.vacancies.find((c) => c.vacancy_id === idVacancy);
        if (vacancy) vacancy.quantity = quantity;
      });
      
      
  }
});


export const {setVacancies, setResponseData, setError, setResponseId, setCount} = responseDraftSlice.actions;
export default responseDraftSlice.reducer;
