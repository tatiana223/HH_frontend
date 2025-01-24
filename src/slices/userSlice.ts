import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';

import { api } from '../api'; 
 
interface UserState {
    username: string;
    isAuthenticated: boolean;
    error?: string | null; 
};
const initialState: UserState = {
    username: '',
    isAuthenticated: false,
    error: null,
};
// Асинхронное действие для авторизации
export const loginUserAsync = createAsyncThunk(
  'user/loginUserAsync',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.login.loginCreate(credentials);
      console.log('API login response:', response);
      return response.data; 
    } catch (error) {
      console.log('API login error:', error);
      return rejectWithValue('Ошибка авторизации'); // Возвращаем ошибку в случае неудачи
    }
  }
); 

// Асинхронное действие для деавторизации
export const logoutUserAsync = createAsyncThunk(
    'user/logoutUserAsync',
    async (_, { rejectWithValue }) => {
      console.log('Лог до запроса на logout'); 
      try {
        const response = await api.logout.logoutCreate();
        console.log('Ответ от API:', response); // Лог после успешного запроса
        return response.data; 
      } catch (error) {
        console.error('Ошибка запроса на logout:', error); // Лог ошибки
        return rejectWithValue('Ошибка при выходе из системы'); 
      }
    }
  );
  

  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(loginUserAsync.pending, (state) => {
          state.error = null;
        })
        .addCase(loginUserAsync.fulfilled, (state, action) => {
          const { username } = action.payload;
          state.username = username;
          state.isAuthenticated = true;
          state.error = null;
        })
        .addCase(loginUserAsync.rejected, (state, action) => {
          state.error = action.payload as string;
          state.isAuthenticated = false; 
        })
  
        .addCase(logoutUserAsync.fulfilled, (state) => {
          console.log('Logout successful. Сбрасываем состояние.');
          state.username = '';
          state.isAuthenticated = false;
          state.error = null;
        })
        .addCase(logoutUserAsync.rejected, (state, action) => {
          state.error = action.payload as string;
        });      
    },
  });

export const {} = userSlice.actions;
export default userSlice.reducer;